package com.app.kafka.cluster;

import com.app.kafka.services.KafkaConnectionService;

import java.util.concurrent.ExecutionException;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.DescribeClusterResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@SuppressWarnings("java:S6212")
public class ClusterController {
    
    private final KafkaConnectionService kafkaConnectionService;

      @GetMapping("/api/cluster")
    public Cluster getClusterInfo(@RequestParam("clusterId") String clusterId) {
        try {
            AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);
            DescribeClusterResult clusterResult = adminClient.describeCluster();
            
            String id = clusterResult.clusterId().get();
            String clusterState = "RUNNING";
            int brokerCount = clusterResult.nodes().get().size();
            String clusterVersion = null;
            long clusterSize =0;

            return new Cluster(id, clusterState, brokerCount, clusterVersion, clusterSize);
        } catch (ExecutionException | InterruptedException e) {
            // Handle exceptions here and return an error response
            return new Cluster("Error", "Error", 0, "Error", 0);
        }
    }
}

