package com.app.kafka.cluster;

import com.app.kafka.services.KafkaConnectionService;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.DescribeClusterResult;
import org.apache.kafka.clients.admin.KafkaAdminClient;
import org.apache.kafka.common.KafkaFuture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/metrics")
public ResponseEntity<List<Map.Entry<String, String>>> getAllMetrics(@RequestParam("clusterId") String clusterId) {
    AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);

    List<Map.Entry<String, String>> metricsList = adminClient.metrics()
            .entrySet().stream()
            .map(entry -> Map.entry(entry.getKey().toString(), entry.getValue().metricValue().toString()))
            .collect(Collectors.toList());

    return ResponseEntity.ok(metricsList);
}


        @GetMapping("/version")
        public String getKafkaClusterVersion(@RequestParam("clusterId") String clusterId) throws ExecutionException, InterruptedException {
            AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);

            String version = adminClient.metrics()
            .entrySet().stream()
            .filter(e -> "app-info".equals(e.getKey().group()) && "version".equals(e.getKey().name()))
            .map(e -> e.getValue().metricValue().toString())
            .findFirst()
            .orElse("VERSION-NOT-FOUND");
    
        System.out.println("Kafka version = " + version);
        return version;
    }

            @GetMapping("/cluster_info")
            public String getClusterInfo_(@RequestParam("clusterId") String clusterId) {
                AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);

                String clusterName = getMetricValue(adminClient, "app-info", "version");
                int brokerCount = getMetricValueAsInt(adminClient, "app-info", "broker-count");
                
                return clusterName+ " - "+ brokerCount;
            }

            private String getMetricValue(AdminClient adminClient, String group, String name) {
                return adminClient.metrics()
                        .entrySet().stream()
                        .filter(e -> group.equals(e.getKey().group()) && name.equals(e.getKey().name()))
                        .map(e -> e.getValue().metricValue().toString())
                        .findFirst()
                        .orElse("NOT-FOUND");
            }

            private int getMetricValueAsInt(AdminClient adminClient, String group, String name) {
                return adminClient.metrics()
                        .entrySet().stream()
                        .filter(e -> group.equals(e.getKey().group()) && name.equals(e.getKey().name()))
                        .map(e -> Integer.parseInt(e.getValue().metricValue().toString()))
                        .findFirst()
                        .orElse(-1); // Default value if metric not found
            }

            
}

