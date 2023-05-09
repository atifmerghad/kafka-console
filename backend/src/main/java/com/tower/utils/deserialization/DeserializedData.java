package com.tower.utils.deserialization;

import com.tower.utils.MessageFormat;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class DeserializedData {
    String deserialized;
    MessageFormat messageFormat;
    Integer schemaId;
}
