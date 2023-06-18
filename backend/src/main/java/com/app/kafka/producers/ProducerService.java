package com.app.kafka.producers;

import java.nio.charset.StandardCharsets;

import com.app.kafka.utils.MessageUtils;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.utils.Bytes;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.app.kafka.services.KafkaConnectionService;
import com.app.kafka.topics.Message;
import com.app.kafka.topics.MessagesHelper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProducerService {

    private final KafkaConnectionService kafkaConnectionService;
    private final MessagesHelper messagesHelper;

    public void produce(String topicName, Message message, String clusterId) throws Exception {
        System.out.println("Start producer !!");
        //messagesHelper.validateTopics(clusterId, singletonList(topicName));
        KafkaTemplate<Bytes, Bytes> kafkaTemplate = kafkaConnectionService.getKafkaTemplate(clusterId);
        String key = message.getKey() != null ? message.getKey() : "";
        String value = message.getValue() != null ? message.getValue() : "";
        ProducerRecord<Bytes, Bytes> producerRecord = new ProducerRecord<>(topicName, Bytes.wrap(key.getBytes()),
                Bytes.wrap(value.getBytes()));
        for (MessageUtils.MessageHeader header : message.getHeaders()) {
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
