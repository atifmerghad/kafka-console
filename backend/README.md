
# Kafka Dashboard

## Features 

- [  Overview ( All items count)
- [ ] Brokers ( n, controller, version, )
- [ ] Topics ( Count, partiitons, URP, Leader, Min ISR, )
- [ ] Consumers ( Active, Empty, Rebalancing, )
- [ ] Schema registry
- [ ] Kafka Connect
- [ ] KsqlDB
- [ ] Security ( Y/N, ACLS, Users, Topics, Consumer groups )

## Swagger :

> http://localhost:8080/api-docs
> http://localhost:8080/api-docs.yaml
```bash
springdoc.api-docs.path=/api-docs
```

> http://localhost:8080/swagger-ui.html
```bash
springdoc.swagger-ui.path=/swagger-ui-custom.html
```


```bash
com.example.kafka.monitor
├── cluster
│   ├── Broker.java
│   ├── ClusterController.java
│   └── ClusterService.java
├── config
│   ├── KafkaConfig.java
│   ├── MetricsConfig.java
│   └── SecurityConfig.java
├── connectors
│   ├── ConnectorsController.java
│   ├── ConnectorsService.java
│   └── Connector.java
├── consumers
│   ├── ConsumerController.java
│   ├── ConsumerGroupsController.java
│   ├── ConsumerGroupsService.java
│   ├── ConsumerService.java
│   ├── Consumer.java
│   └── ConsumerGroup.java
├── producers
│   ├── ProducerController.java
│   ├── ProducerService.java
│   └── CustomObjectSerializer.java
├── schemas
│   ├── SchemaRegistryController.java
│   └── SchemaRegistryService.java
├── topics
│   ├── TopicController.java
│   ├── TopicService.java
│   ├── Topic.java
│   ├── TopicMessage.java
│   └── CustomObjectDeserializer.java
├── ksqldb
│   ├── KsqlDBController.java
│   ├── KsqlDBService.java
│   └── KsqlDBQueryResult.java
├── metrics
│   ├── MetricsController.java
│   └── MetricsService.java
├── security
│   ├── AclController.java
│   ├── AclService.java
│   ├── AuthenticatedUser.java
│   └── SecurityUtils.java
├── services
│   ├── KafkaConnectionService.java
│   └── KsqlDBConnectionService.java
├── utils
│   ├── ConversionUtils.java
│   ├── DateUtils.java
│   ├── StringUtils.java
│   ├── CustomObjectSerializer.java
│   └── CustomObjectDeserializer.java
└── Application.java
```



