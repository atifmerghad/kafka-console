package com.app.kafka.config;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClusterConfig {

    private String name;
    private String bootstrapServers;
    private String username;
    private String password;
    private String protocol;
    private String mechanism;

}
