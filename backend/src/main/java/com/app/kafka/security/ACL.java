package com.app.kafka.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ACL {
    private String principal;
    private String permission;
    private String operation;
    private String resourceType;
    private String resourceName;
    private String patternType;
}
