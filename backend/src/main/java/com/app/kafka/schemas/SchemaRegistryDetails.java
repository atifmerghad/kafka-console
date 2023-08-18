package com.app.kafka.schemas;

import java.util.List;

import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Setter
public class SchemaRegistryDetails {
    private String subject;
    private Integer version;
    private Integer id;
    private String schema;
}
