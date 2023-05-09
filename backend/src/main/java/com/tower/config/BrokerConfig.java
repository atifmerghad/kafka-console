package com.tower.config;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BrokerConfig {
    private String name;
    private String value;
    private String source;
    private String type;
    private boolean isExplicitlySet;
    private boolean isDefaultValue;
    private boolean isReadOnly;
    private boolean isSensitive;
    //private List<Synonyms> synonyms;
    
}




