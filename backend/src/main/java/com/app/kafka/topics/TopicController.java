package com.app.kafka.topics;

import com.app.kafka.services.KafkaConnectionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.TopicPartitionInfo;
import org.apache.kafka.common.config.ConfigResource;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class TopicController {

    private final KafkaConnectionService kafkaConnectionService;
    @Value("${topics.exclude-regex-patterns:}")
    private List<String> excludePatterns;

    @GetMapping("/api/topics")
    public TopicsDto getTopics(@RequestParam("clusterId") String clusterId) throws Exception {
        try {
            AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);
            ListTopicsResult listTopicsResult = adminClient.listTopics(new ListTopicsOptions().listInternal(true));
            Set<String> allTopicNames = listTopicsResult.names().get();
            Set<String> filteredTopicNames = allTopicNames.stream().filter(this::notOnExcludedList)
                    .collect(Collectors.toSet());
            Map<String, TopicDescription> topicDescriptions = adminClient.describeTopics(filteredTopicNames).all()
                    .get();

            List<TopicMetadata> topics = new ArrayList<>();
            topicDescriptions.forEach(
                    (k, v) -> topics.add(TopicMetadata.builder().topicName(k).isInternal(v.isInternal())
                            .partitionCount(v.partitions().size()).build()));

            for (TopicDescription description : topicDescriptions.values()) {
                System.out.println("Name: " + description.name());
                System.out.println("Is Internal: " + description.isInternal());

                System.out.println("Partitions:");
                for (TopicPartitionInfo partitionInfo : description.partitions()) {
                    System.out.println("\tPartition: " + partitionInfo.partition());
                    System.out.println("\tLeader: " + partitionInfo.leader().id());
                    System.out.println("\tReplicas: " + partitionInfo.replicas().size());
                    System.out.println("\tIsr: " + partitionInfo.isr());
                }
            }
            Collections.sort(topics);
            System.out.println("result ! ::::"+ TopicsDto.builder().topics(topics).build());
            return TopicsDto.builder().topics(topics).build();
        } catch (InterruptedException e) {
            System.err.println("eror11 : "+e);
            Thread.currentThread().interrupt();
            throw new Exception(e);
        } catch (ExecutionException e) {
            System.err.println("eror22 : "+e);
            throw new Exception(e);
        }
    }

    @PostMapping("/api/topic")
    public void createTopic(@RequestParam("clusterId") String clusterId, @RequestBody TopicMetadata topicMetadata) {
        try {
            AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);
            // NewTopic topic = new NewTopic(topicMetadata.getTopicName(), 1, (short) 1);
            NewTopic topic = TopicBuilder.name(topicMetadata.getTopicName())
                    .replicas(3)
                    .partitions(1)
                    .compact()
                    .build();
            CreateTopicsResult createTopicsResult = adminClient.createTopics(Collections.singleton(topic));

            String ordersTopic = topicMetadata.getTopicName();
            createTopicsResult.values().get(ordersTopic).get();

            createTopicsResult.values().get(ordersTopic).get();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    @DeleteMapping("/api/topic/{topicId}")
    public void deleteTopic(@RequestParam("clusterId") String clusterId, @PathVariable("topicId") String topicId) {
        try {
            AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);
            DeleteTopicsResult deleteTopicsResult = adminClient.deleteTopics(Collections.singletonList(topicId));

            while (!deleteTopicsResult.all().isDone()) {
                // Wait for future task to complete
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    private boolean notOnExcludedList(String topicName) {
        return excludePatterns.stream().noneMatch(s -> Pattern.matches(s, topicName));
    }

    /**
     * @param clusterId
     * @param topic
     * @return
     * @throws InterruptedException
     * @throws ExecutionException
     */
    @GetMapping("/api/topic/{topicId}")
    private Map<String, String> describeTopic(@RequestParam("clusterId") String clusterId,
        @PathVariable("topicId") String topic) throws InterruptedException, ExecutionException {
        AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);
        DescribeTopicsResult result = adminClient.describeTopics(Collections.singletonList(topic));
        Map<String, TopicDescription> descriptions = result.all().get();
        long size = 0;
        for (TopicDescription description : descriptions.values()) {
            System.out.println("Name: " + description.name());
            System.out.println("Is Internal: " + description.isInternal());

            size = description.partitions().stream().mapToLong(p -> p.replicas().size()).sum();
            System.out.println("The size of topic " + topic + " is: " + size);

            System.out.println("Partitions:");
            for (TopicPartitionInfo partitionInfo : description.partitions()) {
                System.out.println("\tPartition: " + partitionInfo.partition());
                System.out.println("\tLeader: " + partitionInfo.leader().id());
                System.out.println("\tReplicas: " + partitionInfo.replicas());
                System.out.println("\tIsr: " + partitionInfo.isr());
            }
        }

        ConfigResource resource = new ConfigResource(ConfigResource.Type.TOPIC, topic);
        DescribeConfigsResult configResult = adminClient.describeConfigs(Collections.singletonList(resource));
        Map<ConfigResource, Config> configs = configResult.all().get();

        Map<String, String> confs = new HashMap<String, String>();
        confs.put("size", Long.toString(size));
        for (Config config : configs.values()) {
            for (ConfigEntry entry : config.entries()) {
                System.out.println("\t" + entry.name() + ": " + entry.value());
                confs.put(entry.name(), entry.value());
            }
        }
        return confs;
    }
}