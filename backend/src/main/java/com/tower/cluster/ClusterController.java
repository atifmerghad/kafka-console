package com.tower.cluster;

import java.util.concurrent.ExecutionException;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.DescribeClusterResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tower.services.KafkaConnectionService;

import lombok.AllArgsConstructor;
import org.apache.kafka.clients.admin.DescribeClusterResult;

@RestController
@AllArgsConstructor
@SuppressWarnings("java:S6212")
public class ClusterController {
    
    private final KafkaConnectionService kafkaConnectionService;

    // @GetMapping("/api/cluster")
    // public Cluster getClusterInfo(@RequestParam("clusterId") String clusterId) throws ExecutionException, InterruptedException {
    //     AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);
    //     DescribeClusterResult clusterResult = adminClient.describeCluster();
    //     DescribeClusterResult clusterDescription = clusterResult.clusterDescription();
    //     String id = clusterDescription.clusterId().toString();
    //     String clusterState = clusterDescription.state().toString();
    //     int brokerCount = clusterDescription.brokers().size();
    //     String clusterVersion = clusterDescription.controller().version().toString();
    //     long clusterSize = clusterDescription.controller().size();
    //     return new Cluster(id, clusterState, brokerCount, clusterVersion, clusterSize);
    // }
}
