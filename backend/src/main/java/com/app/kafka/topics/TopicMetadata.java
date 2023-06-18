package com.app.kafka.topics;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Data;
import org.apache.kafka.common.TopicPartition;
@Data
@Builder
public class TopicMetadata implements Comparable<TopicMetadata> {
    private String topicName;
    private Boolean isInternal;
    private Map<Integer, TopicPartition> partitions;
    private int partitionCount;
    private int replicationFactor;
    private String cleanupPolicy;
    private String documentation;
    //private LogDirSummary logDirSummary;
    private List<String> allowedActions;

    @Override
    public int compareTo(TopicMetadata o) {
        return topicName.compareTo(o.getTopicName());
    }
}
