package com.app.kafka.cluster;

import com.app.kafka.services.KafkaConnectionService;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

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
