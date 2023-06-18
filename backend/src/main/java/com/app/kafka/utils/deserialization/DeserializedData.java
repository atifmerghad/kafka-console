package com.app.kafka.utils.deserialization;

import com.app.kafka.utils.MessageFormat;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class DeserializedData {
    String deserialized;
    MessageFormat messageFormat;
    Integer schemaId;
}
