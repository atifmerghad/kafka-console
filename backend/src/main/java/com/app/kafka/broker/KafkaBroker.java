package com.app.kafka.broker;

import java.util.List;

import com.app.kafka.config.BrokerConfig;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KafkaBroker {
    private int brokerId;
    private int logDirSize;
    private String address;
    private Object rack;
    private boolean controller;
    private List<BrokerConfig> brokerConfig;
}
