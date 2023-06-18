package com.app.kafka.broker;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.app.kafka.services.KafkaConnectionService;
import org.apache.kafka.clients.admin.Config;
import org.apache.kafka.clients.admin.ConfigEntry;
import org.apache.kafka.clients.admin.DescribeClusterResult;
import org.apache.kafka.clients.admin.DescribeConfigsResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.apache.kafka.common.KafkaFuture;
import org.apache.kafka.common.Node;
import org.apache.kafka.common.config.ConfigResource;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class BrokersController {


    private final KafkaConnectionService kafkaConnectionService;

    @GetMapping("/api/brokers")
    public BrokersDto getBrokers(@RequestParam("clusterId") String clusterId) {
        try {
            DescribeClusterResult describeClusterResult = kafkaConnectionService.getAdminClient(clusterId).describeCluster();
            Collection<Node> nodes = describeClusterResult.nodes().get();
            List<KafkaBroker> kafkaBrokers = new ArrayList<>();
            Node controller = describeClusterResult.controller().get();

            nodes.forEach(node ->{
                kafkaBrokers.add(KafkaBroker.builder()
                .brokerId(node.id())
                .address(node.host()+":"+node.port())
                .rack(node.rack())
                .controller(node.id() == controller.id())
                .logDirSize(0)
                .build());
            });
            return BrokersDto.builder().brokers(kafkaBrokers).controllerId(controller.id()).version("3.4").build();
        } catch (Exception e) {
            Thread.currentThread().interrupt();
        }
        return null;
    }


    @GetMapping("/api/configs/{name}")
    public Collection<KafkaBrokerConfig> getConfigs(@PathVariable("name") String name, @RequestParam("clusterId") String clusterId) throws Exception {
        try {
            ConfigResource o = new ConfigResource(ConfigResource.Type.BROKER, name);
            Collection<ConfigResource> resources = Collections.singletonList(o);
            DescribeConfigsResult describeClusterResult = kafkaConnectionService.getAdminClient(clusterId).describeConfigs(resources);
            KafkaFuture<Config> nodes = describeClusterResult.values().get(o);
            Collection<ConfigEntry> entries = nodes.get().entries();
            List<KafkaBrokerConfig> configs = new ArrayList<>();
            entries.forEach(e -> configs.add(KafkaBrokerConfig.builder()
                    .name(e.name())
                    .source(e.source())
                    .value(e.value())
                    .isDefaultValue(e.isDefault())
                    .isReadOnly(e.isReadOnly())
                    .isSensitive(e.isSensitive())
                    .build()));
            return configs.stream().sorted().collect(Collectors.toList());
        } catch (Exception e) {
            Thread.currentThread().interrupt();
            throw new Exception(e);
        }
    }
    
}
