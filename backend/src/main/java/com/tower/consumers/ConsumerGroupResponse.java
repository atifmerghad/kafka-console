package com.tower.consumers;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ConsumerGroupResponse {
    private List<ConsumerGroupOffset> consumerGroupOffset;
}
