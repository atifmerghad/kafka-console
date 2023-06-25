package com.app.kafka.topics;

import java.util.List;

import com.app.kafka.utils.MessageFormat;
import com.app.kafka.utils.MessageUtils;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Message {
    private String id;
    private List<MessageUtils.MessageHeader> headers;
    private String key;
    private MessageFormat keyFormat;
    private String value;
    private MessageFormat valueFormat;
    private long timestamp;
    private int partition;
    private long offset;
    private String topic;
    
}
