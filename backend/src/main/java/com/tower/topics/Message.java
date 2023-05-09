package com.tower.topics;

import java.util.List;

import com.tower.utils.MessageFormat;
import com.tower.utils.MessageUtils.MessageHeader;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Message {
    private String id;
    private List<MessageHeader> headers;
    private String key;
    private MessageFormat keyFormat;
    private String value;
    private MessageFormat valueFormat;
    private long timestamp;
    private int partition;
    private long offset;
    private String topic;
}
