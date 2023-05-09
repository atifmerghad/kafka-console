
package com.tower.broker;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class BrokersDto {
    private int controllerId;
    private String version;
    private List<KafkaBroker> brokers;
}
