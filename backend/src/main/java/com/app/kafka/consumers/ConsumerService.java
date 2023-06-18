package com.app.kafka.consumers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import static java.util.Collections.singletonList;

import com.app.kafka.services.KafkaConnectionService;
import com.app.kafka.utils.deserialization.DeserializationService;
import com.app.kafka.utils.deserialization.DeserializedMessage;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.PartitionInfo;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.utils.Bytes;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.kafka.topics.Message;
import com.app.kafka.topics.MessageDto;
import com.app.kafka.topics.MessageMetadata;
import com.app.kafka.topics.MessagesHelper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.Duration;


@Slf4j
@Service
@RequiredArgsConstructor
public class ConsumerService {

    private final KafkaConnectionService kafkaConnectionService;
    private final MessagesHelper messagesHelper;
    private final DeserializationService deserializationService;
    
    MessageDto getTopicMessages(@PathVariable("topicName") String topicName,
    @PathVariable("partition") String partitions,
    @RequestParam("page") String pageParam,
    @RequestParam("limit") String limitParam,
    @RequestParam(value = "beginningTimestampMillis", required = false) Long beginningTimestampMillis,
    @RequestParam(value = "endTimestampMillis", required = false) Long endTimestampMillis,
    @RequestParam(value = "offset", required = false) Long offset,
    @RequestParam("clusterId") String clusterId) throws Exception {
        System.out.println("call  messagesHelper: -------->");
messagesHelper.validateTopics(clusterId, singletonList(topicName));

int limit = Integer.parseInt(limitParam); // per partition!
long page = Long.parseLong(pageParam); // per partition!
try (KafkaConsumer<Bytes, Bytes> consumer = kafkaConnectionService.getKafkaConsumer(clusterId, limit)) {
    MessageMetadata metadata = prepareMetadata(topicName, partitions, beginningTimestampMillis,endTimestampMillis, offset, consumer);
    List<Message> messages = new ArrayList<>();
    for (Map.Entry<Integer, TopicPartition> entry : metadata.getPartitions().entrySet()) {

        Integer partitionIndex = entry.getKey();
        TopicPartition partition = entry.getValue();
        consumer.assign(singletonList(partition));

        Long startOffsetForPartition = metadata.getBeginningOffsets().get(partitionIndex);
        Long endOffsetForPartition = metadata.getEndOffsets().get(partitionIndex);
        if (startOffsetForPartition < 0) {
            consumer.seekToEnd(singletonList(partition));
            continue;
        }

        if (metadata.getPartitionRangeSize(partitionIndex) == 0) {
            continue;
        }

        long position = endOffsetForPartition - limit * (page - 1);
        long seekTo = position - limit;
        if (seekTo > startOffsetForPartition) {
            consumer.seek(partition, seekTo);
        } else {
            consumer.seek(partition, startOffsetForPartition);
        }
        pollMessages(clusterId, limit, consumer, endOffsetForPartition, partition, messages);
    }

    messages.sort(Comparator.comparing(Message::getTimestamp));

    long totalResult = metadata.getEndOffsets().keySet().stream()
            .map(index -> metadata.getEndOffsets().get(index) - metadata.getBeginningOffsets().get(index))
            .reduce(0L, Long::max);
            
    MessageDto messagesDto = MessageDto.builder()
            .messages(messages)
            .partitionOffsets(metadata.getBeginningOffsets())
            .partitionEndOffsets(metadata.getEndOffsets())
            .totalResults(totalResult)
            .build();
    return messagesDto;
}
}

    private ConsumerRecords<Bytes, Bytes> getConsumerRecords(KafkaConsumer<Bytes, Bytes> consumer, TopicPartition partition) {
        long startTime = System.nanoTime();
        ConsumerRecords<Bytes, Bytes> records = consumer.poll(Duration.ofMillis(200));
        return records;
    }
    private void pollMessages(String clusterId, int limit, KafkaConsumer<Bytes, Bytes> consumer, Long endOffset, TopicPartition partition, List<Message> messages) {
        int emptyPolls = 0;
        int messagesCount = 0;
        long lastOffset = 0;
        while (emptyPolls < 5 && messagesCount < limit && lastOffset <= endOffset - 1) {
            ConsumerRecords<Bytes, Bytes> records = getConsumerRecords(consumer, partition);
            if (records.isEmpty()) {
                emptyPolls++;
            } else {
                emptyPolls = 0;
            }
            for (ConsumerRecord<Bytes, Bytes> consumerRecord : records) {
                if (consumerRecord.offset() >= endOffset) {
                    messagesCount = limit;
                    continue;
                }

                DeserializedMessage deserializedMessage = deserializationService.deserialize(clusterId, consumerRecord);
                if (messagesCount < limit) {
                    messagesCount += 1;
                    messages.add(Message
                            .builder()
                            .id(consumerRecord.partition()+"-"+consumerRecord.offset())
                            .key(deserializedMessage.getKeyData().getDeserialized())
                            .keyFormat(deserializedMessage.getKeyData().getMessageFormat())
                            .value(deserializedMessage.getValueData().getDeserialized())
                            .valueFormat(deserializedMessage.getValueData().getMessageFormat())
                            .offset(consumerRecord.offset())
                            .partition(consumerRecord.partition())
                            .topic(consumerRecord.topic())
                            .timestamp(consumerRecord.timestamp())
                            .headers(messagesHelper.mapHeaders(consumerRecord.headers()))
                            .build());
                }
                lastOffset = consumerRecord.offset();
            }
        }

    }

    private MessageMetadata prepareMetadata(
        String topicName,
        String partitions,
        Long beginningTimestampMillis,
        Long endTimestampMillis,
        Long offset,
        KafkaConsumer<Bytes, Bytes> consumer) {
    Map<Integer, TopicPartition> partitionMap;
    Collector<Integer, ?, Map<Integer, TopicPartition>> integerMapCollector = Collectors.toMap(Function.identity(),
            p -> new TopicPartition(topicName, p));
    if (partitions.equalsIgnoreCase("all")) {
        List<PartitionInfo> partitionInfos = consumer.partitionsFor(topicName);
        partitionMap = IntStream.rangeClosed(0, partitionInfos.size() - 1)
                .boxed()
                .collect(integerMapCollector);
    } else {
        partitionMap = Arrays.stream(partitions.split(","))
                .mapToInt(Integer::parseInt)
                .boxed()
                .collect(integerMapCollector);
    }

    consumer.assign(partitionMap.values());

    Map<Integer, Long> beginningOffsets = messagesHelper.calculateBeginningOffsets(beginningTimestampMillis, offset,
            consumer, partitionMap.values());
    Map<Integer, Long> endOffsets = messagesHelper.calculateEndOffsets(endTimestampMillis, offset, consumer,
            partitionMap.values());
    return MessageMetadata.builder()
            .topicName(topicName)
            .partitions(partitionMap)
            .beginningOffsets(beginningOffsets)
            .endOffsets(endOffsets)
            .build();
}

    
}
