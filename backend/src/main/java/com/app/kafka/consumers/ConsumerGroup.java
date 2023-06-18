package com.app.kafka.consumers;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConsumerGroup {
    private String groupId;
    private String state;
    private String coordinatorHost;
    private int coordinatorId;
    private int memberCount;
    private String protocol;
    private String protocolType;
    private int lag;
}
