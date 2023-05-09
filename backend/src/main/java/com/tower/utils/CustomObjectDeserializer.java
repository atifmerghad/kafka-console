package com.tower.utils;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.common.utils.Bytes;
import org.springframework.stereotype.Service;

import com.tower.helpers.DeserializedData;
import com.tower.helpers.DeserializedMessage;
import com.tower.helpers.MessageFormat;

@Service
public class CustomObjectDeserializer {
    
    private final StringMessageSerde stringMessageSerde;

    public CustomObjectDeserializer(StringMessageSerde stringMessageSerde) {
        this.stringMessageSerde = stringMessageSerde;
    }
    
    public DeserializedMessage deserialize(String clusterId, ConsumerRecord<Bytes, Bytes> message) {
        DeserializedData keyData = DeserializedData.builder().build();
        DeserializedData valueData = DeserializedData.builder().build();

        if (message.key() != null) {
            keyData = DeserializedData.builder()
                    .deserialized(stringMessageSerde.deserialize(message.key()))
                    .messageFormat(MessageFormat.STRING)
                    .build();
        }
        if (message.value() != null) {
            valueData = DeserializedData.builder()
                    .deserialized(stringMessageSerde.deserialize(message.value()))
                    .messageFormat(MessageFormat.STRING)
                    .build();
        }

        return DeserializedMessage.builder().keyData(keyData).valueData(valueData).build();
    }
}
