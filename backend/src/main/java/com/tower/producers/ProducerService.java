package com.tower.producers;

import java.nio.charset.StandardCharsets;

import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.utils.Bytes;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.tower.services.KafkaConnectionService;
import com.tower.topics.Message;
import com.tower.topics.MessagesHelper;
import com.tower.utils.MessageUtils.MessageHeader;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import static java.util.Collections.singletonList;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProducerService {

    private final KafkaConnectionService kafkaConnectionService;
    private final MessagesHelper messagesHelper;

    public void produce(String topicName, Message message, String clusterId) throws Exception {
        messagesHelper.validateTopics(clusterId, singletonList(topicName));
        KafkaTemplate<Bytes, Bytes> kafkaTemplate = kafkaConnectionService.getKafkaTemplate(clusterId);
        String key = message.getKey() != null ? message.getKey() : "";
        String value = message.getValue() != null ? message.getValue() : "";
        ProducerRecord<Bytes, Bytes> producerRecord = new ProducerRecord<>(topicName, Bytes.wrap(key.getBytes()),
                Bytes.wrap(value.getBytes()));
        for (MessageHeader header : message.getHeaders()) {
            producerRecord
                    .headers()
                    .add(replaceTokens(header.getKey(), 0),
                            header.getValue() != null
                                    ? replaceTokens(header.getValue(), 0).getBytes(StandardCharsets.UTF_8)
                                    : null);
        }
        kafkaTemplate.send(producerRecord);
        kafkaTemplate.flush();
    }

    private String replaceTokens(String data, int i) {
        //data = PlaceholderFormatUtil.formatPlaceholder("\\{\\{count(.*?)}}", data, FieldType.STRING, i);
        // data = PlaceholderFormatUtil.formatPlaceholder("\\{\\{timestamp(.*?)}}",
        // data, FieldType.DATE, LocalDate.now());
        // data = PlaceholderFormatUtil.formatPlaceholder("\\{\\{uuid(.*?)}}", data,
        // FieldType.STRING, UUID.randomUUID().toString());
        return data;
    }
}
