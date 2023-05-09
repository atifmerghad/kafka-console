package com.tower.utils;

import lombok.Builder;
import lombok.Data;


public class MessageUtils {
    public enum MessageFormat {
        JSON,
        PROTOBUF,
        AVRO,
        STRING
    }
    @Data
    @Builder
    public static class MessageHeader {
            private String key;
            private String value;
    }
}



