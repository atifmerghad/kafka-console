package com.app.kafka.topics;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Data;
import org.apache.kafka.common.TopicPartition;
@Data
@Builder
public class MessageMetadata implements Comparable<TopicMetadata> {
    private String topicName;
    private Boolean isInternal;
    private Map<Integer, TopicPartition> partitions;
    private int partitionCount;
    private int replicationFactor;
    private String cleanupPolicy;
    private String documentation;
    //private LogDirSummary logDirSummary;
    private List<String> allowedActions;
    
    private Map<Integer, Long> beginningOffsets; // (index, beginning offset)
    private Map<Integer, Long> endOffsets; // (index, end offset)


    @Override
    public int compareTo(TopicMetadata o) {
        return topicName.compareTo(o.getTopicName());
    }

        public Long getPartitionRangeSize(Integer partition) {
        return endOffsets.get(partition) - beginningOffsets.get(partition);
    }

    public Long getAllPartitionRangeSize() {
        long size = 0L;
        for (Integer key : partitions.keySet()) {
            size += getPartitionRangeSize(key);
        }
        return size;
    }
}
