package com.tower.utils.deserialization;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class DeserializedMessage {
    DeserializedData keyData;
    DeserializedData valueData;
}
