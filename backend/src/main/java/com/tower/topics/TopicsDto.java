package com.tower.topics;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TopicsDto {
    private List<TopicMetadata> topics;
}
