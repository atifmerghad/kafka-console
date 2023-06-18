package com.app.kafka.utils.deserialization;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.common.utils.Bytes;
import org.springframework.stereotype.Service;

import com.app.kafka.utils.MessageFormat;
import com.app.kafka.utils.StringMessageSerde;

import java.nio.ByteBuffer;
import java.util.Optional;

@Service
public class DeserializationService {
    private final StringMessageSerde stringMessageSerde;

    public DeserializationService(StringMessageSerde stringMessageSerde) {
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

    /**
     * Schema identifier is fetched from message, because schema could have changed.
     * Latest schema may be too new.
     */
    private Optional<Integer> getSchemaIdFromMessage(Bytes message) {
        ByteBuffer buffer = ByteBuffer.wrap(message.get());
        if (buffer.hasRemaining()) {
            return buffer.get() == 0 ? Optional.of(buffer.getInt()) : Optional.empty();
        }
        return Optional.empty();
    }
}
