package com.tower.consumers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.ConsumerGroupDescription;
import org.apache.kafka.clients.admin.ConsumerGroupListing;
import org.apache.kafka.clients.admin.DescribeConsumerGroupsResult;
import org.apache.kafka.clients.admin.ListConsumerGroupsResult;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.consumer.OffsetAndMetadata;
import org.apache.kafka.common.ConsumerGroupState;
import org.apache.kafka.common.KafkaFuture;
import org.apache.kafka.common.TopicPartition;
import org.springframework.web.bind.annotation.*;

import com.tower.services.KafkaConnectionService;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Slf4j
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ConsumerGroupController {

    private final KafkaConnectionService kafkaConnectionService;

    @GetMapping("/api/consumer-groups")
    public List<ConsumerGroup> getConsumerGroups(@RequestParam("clusterId") String clusterId)
            throws ExecutionException, InterruptedException {
                AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);

                ListConsumerGroupsResult consumerGroups = kafkaConnectionService.getAdminClient(clusterId).listConsumerGroups();
                Collection<ConsumerGroupListing> consumerGroupListings = consumerGroups.all().get();

                List<ConsumerGroup> result = new ArrayList<>();
                for (ConsumerGroupListing consumerGroupListing : consumerGroupListings) {
                String groupId = consumerGroupListing.groupId();
                DescribeConsumerGroupsResult describeConsumerGroupsResult = adminClient.describeConsumerGroups(Collections.singleton(groupId));
                ConsumerGroupDescription consumerGroupDescription = describeConsumerGroupsResult.all().get().get(groupId);
                Map<TopicPartition, Long> topicPartitionOffsets = consumerGroupDescription.members().stream()
                        .flatMap(memberDescription -> memberDescription.assignment().topicPartitions().stream())
                        .distinct()
                        .collect(Collectors.toMap(tp -> tp, tp -> {
                            try {
                                return adminClient.listConsumerGroupOffsets(groupId).partitionsToOffsetAndMetadata().get().get(tp).offset();
                            } catch (Exception e) {
                                throw new RuntimeException(e);
                            }
                        }));

                        result.add(ConsumerGroup.builder().state(consumerGroupDescription.state().toString())
                        .groupId(groupId)
                        .coordinatorHost(consumerGroupDescription.coordinator().host())
                        .coordinatorId(consumerGroupDescription.coordinator().id())
                        .protocolType("RoundRobinAssigner")
                        .protocol("RoundRobinAssigner")
                        .memberCount(consumerGroupDescription.members().size())
                        .lag(0)
                        .build());
                        System.out.printf("==================X  X================%n");
                        System.out.printf("State: %s%n", consumerGroupDescription.state());
                        System.out.printf("ID: %s%n", groupId);
                        System.out.printf("coordinator: %s%n", consumerGroupDescription.coordinator().id());
                        System.out.printf("Protocol: %s%n", consumerGroupDescription.coordinator().host());
                        System.out.printf("Members: %s%n", consumerGroupDescription.members());
                        System.out.printf("partitionAssignor: %s%n", consumerGroupDescription.partitionAssignor());
                        System.out.printf("Lag (Sum): %s%n", topicPartitionOffsets);
                        System.out.printf("Topic Partitions: %s%n", topicPartitionOffsets);
                        
                }



        return result;
    }
    

    @GetMapping("/api/consumer-group/{groupId}")
    public ConsumerGroupResponse getConsumerGroup(
            @PathVariable("groupId") String groupId,
            @RequestParam("clusterId") String clusterId) throws ExecutionException, InterruptedException {
        ConsumerGroupResponse result = ConsumerGroupResponse.builder().consumerGroupOffset(new ArrayList<>()).build();
        Map<TopicPartition, OffsetAndMetadata> offsets = kafkaConnectionService.getAdminClient(clusterId)
                .listConsumerGroupOffsets(groupId).partitionsToOffsetAndMetadata().get();
        offsets.forEach((tp, omd) -> result
                .getConsumerGroupOffset()
                .add(ConsumerGroupOffset
                        .builder()
                        .key(tp)
                        .topic(tp.topic())
                        .partition(tp.partition())
                        .offset(omd.offset())
                        .build()));

        ConsumerGroupDescription consumerGroupSummary = kafkaConnectionService.getAdminClient(clusterId)
                .describeConsumerGroups(Collections.singletonList(groupId)).describedGroups().get(groupId).get();

        consumerGroupSummary.members().forEach(member -> member.assignment().topicPartitions()
                .forEach((assignment -> result.getConsumerGroupOffset().forEach(o -> {
                    if (o.getKey().equals(assignment)) {
                        o.setClientId(member.clientId());
                        o.setConsumerId(member.consumerId());
                        o.setHost(member.host());
                    }
                }))));

        try (KafkaConsumer<String, String> kafkaConsumer = kafkaConnectionService.createConsumer(clusterId)) {
            List<TopicPartition> partitions = result.getConsumerGroupOffset().stream().map(ConsumerGroupOffset::getKey)
                    .collect(Collectors.toList());
            Map<TopicPartition, Long> endOffsets = kafkaConsumer.endOffsets(partitions);
            result.getConsumerGroupOffset().forEach(consumerGroupOffset -> {
                String topic = consumerGroupOffset.getTopic();
                int partition = consumerGroupOffset.getPartition();
                consumerGroupOffset.setEndOffset(endOffsets.getOrDefault(new TopicPartition(
                        topic,
                        partition), null));
            });
        }
        return result;
    }

    @DeleteMapping("/api/consumer-group/{groupId}")
    public void deleteConsumerGroup(@PathVariable("groupId") String groupId,
            @RequestParam("clusterId") String clusterId) {
        kafkaConnectionService.getAdminClient(clusterId).deleteConsumerGroups(Collections.singletonList(groupId));
    }

}
