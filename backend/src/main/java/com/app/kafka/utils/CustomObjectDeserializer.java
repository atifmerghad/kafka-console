package com.app.kafka.utils;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.common.utils.Bytes;
import org.springframework.stereotype.Service;

import com.app.kafka.helpers.DeserializedData;
import com.app.kafka.helpers.DeserializedMessage;
import com.app.kafka.helpers.MessageFormat;

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
