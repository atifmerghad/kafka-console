package com.app.kafka.cluster;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Cluster {
    private String clusterId;
    private String clusterState;
    private int brokerCount;
    private String clusterVersion;
    private long clusterSize;
}
