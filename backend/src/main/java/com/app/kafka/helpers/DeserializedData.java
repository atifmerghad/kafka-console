package com.app.kafka.helpers;


import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class DeserializedData {
    String deserialized;
    MessageFormat messageFormat;
    Integer schemaId;
}
