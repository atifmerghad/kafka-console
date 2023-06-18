package com.app.kafka.config;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.util.*;
import static java.util.stream.Collectors.toMap;

@Component
@Slf4j
@Data
@ConfigurationProperties(prefix = "tower")
public class AppConfig {

    protected static final String SPECIAL_CHARS = "[^a-zA-Z0-9\\s]";
    private List<ClusterConfig> clusters;
    private Map<String, ClusterConfig> clusterConfig;

    @PostConstruct
    public void initialize() {
        initConfig();
        log.info(toString());
    }

    private void initConfig() {
        log.info("Advanced configuration present, {}", clusters);
        clusterConfig = clusters.stream()
                .collect(toMap(
                        cluster -> sanitizeClusterId(cluster.getName()),
                        cluster -> cluster));
    }

    public String getBootstrapServerByClusterId(String clusterId) throws Exception {
        ClusterConfig cluster = clusterConfig.get(clusterId);
        if (Objects.isNull(cluster)) {
            throw new Exception("Unknown clusterId");
        } else {
            return cluster.getBootstrapServers();
        }
    }

    public Map<String, String> getTowerConfig(String clusterId) {

        ClusterConfig cluster = clusterConfig.get(clusterId);

        Map<String, String> clusterDetails = new HashMap<>();
        clusterDetails.put("bootstrap-server", cluster.getBootstrapServers());
        clusterDetails.put("username", cluster.getUsername());
        clusterDetails.put("password", cluster.getPassword());
        clusterDetails.put("protocol", cluster.getProtocol());
        clusterDetails.put("mechanism", cluster.getMechanism());
        return clusterDetails;
    }

    public KafkaProperties getKafkaProperties() {
        KafkaProperties kafkaProperties = new KafkaProperties();
        return kafkaProperties;
    }

    private String sanitizeClusterId(String clusterId) {
        return clusterId.replaceAll(SPECIAL_CHARS, "_");
    }

}
