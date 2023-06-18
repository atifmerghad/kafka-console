package com.app.kafka.services;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.springframework.kafka.core.KafkaTemplate;
import org.apache.kafka.clients.CommonClientConfigs;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.config.SaslConfigs;
import org.apache.kafka.common.security.plain.PlainLoginModule;
import org.apache.kafka.common.serialization.BytesDeserializer;
import org.apache.kafka.common.serialization.BytesSerializer;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.apache.kafka.common.utils.Bytes;
import org.springframework.stereotype.Service;
import org.apache.kafka.common.serialization.StringDeserializer;

import com.app.kafka.config.AppConfig;

@Service
public class KafkaConnectionService {

    protected static final String RECONNECT_BACKOFF_MS_CONFIG_CONSTANT_VALUE = "5000";
    protected static final String RECONNECT_BACKOFF_MAX_MS_CONFIG_CONSTANT_VALUE = "10000";
    protected static final String SASL_PLAIN = "PLAIN";
    protected static final String SASL_PLAINTEXT = "SASL_SSL";
    protected static final String SASL_JAAS_CONFIG = "%s required username=\"%s\" password=\"%s\";";
    private final AppConfig appConfig;

    private final Map<String, KafkaTemplate<Bytes, Bytes>> kafkaTemplates = new ConcurrentHashMap<>();
    private final Map<String, AdminClient> adminClients = new ConcurrentHashMap<>();

    public KafkaConnectionService(AppConfig appConfig) {
        this.appConfig = appConfig;
    }

    public KafkaTemplate<Bytes, Bytes> getKafkaTemplate(String clusterId) {
        return kafkaTemplates.computeIfAbsent(clusterId, k -> {
            Map<String, Object> props = appConfig.getKafkaProperties().buildProducerProperties();
            props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, this.appConfig.getTowerConfig(clusterId).get("bootstrap-server"));
            props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, BytesSerializer.class);
            props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, BytesSerializer.class);
            props.put(ProducerConfig.RECONNECT_BACKOFF_MS_CONFIG, RECONNECT_BACKOFF_MS_CONFIG_CONSTANT_VALUE);
            props.put(ProducerConfig.RECONNECT_BACKOFF_MAX_MS_CONFIG, RECONNECT_BACKOFF_MAX_MS_CONFIG_CONSTANT_VALUE);
            props.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, SASL_PLAINTEXT);
            props.put(SaslConfigs.SASL_MECHANISM, SASL_PLAIN);
            props.put(SaslConfigs.SASL_JAAS_CONFIG,String.format(SASL_JAAS_CONFIG, PlainLoginModule.class.getName(), this.appConfig.getTowerConfig(clusterId).get("username"), this.appConfig.getTowerConfig(clusterId).get("password")));

            return new KafkaTemplate<>(new DefaultKafkaProducerFactory<>(props));
        });
    }

    public AdminClient getAdminClient(String clusterId) {
        return adminClients.computeIfAbsent(clusterId, k -> {
            Map<String, Object> props = appConfig.getKafkaProperties().buildAdminProperties();
        
            props.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG,  this.appConfig.getTowerConfig(clusterId).get("bootstrap-server"));
            props.put(AdminClientConfig.RECONNECT_BACKOFF_MS_CONFIG, RECONNECT_BACKOFF_MS_CONFIG_CONSTANT_VALUE);
            props.put(AdminClientConfig.RECONNECT_BACKOFF_MAX_MS_CONFIG, RECONNECT_BACKOFF_MAX_MS_CONFIG_CONSTANT_VALUE);
            props.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, SASL_PLAINTEXT);
            props.put(SaslConfigs.SASL_MECHANISM, SASL_PLAIN);
            props.put(SaslConfigs.SASL_JAAS_CONFIG,String.format(SASL_JAAS_CONFIG, PlainLoginModule.class.getName(), this.appConfig.getTowerConfig(clusterId).get("username"), this.appConfig.getTowerConfig(clusterId).get("password")));

            return AdminClient.create(props);
        });
    }
 
    public KafkaConsumer<Bytes, Bytes> getKafkaConsumer(String clusterId, int limit) {
        Map<String, Object> props = appConfig.getKafkaProperties().buildConsumerProperties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, this.appConfig.getTowerConfig(clusterId).get("bootstrap-server"));
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, BytesDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, BytesDeserializer.class);
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest");
        props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, limit);
        props.put(ConsumerConfig.RECONNECT_BACKOFF_MS_CONFIG, RECONNECT_BACKOFF_MS_CONFIG_CONSTANT_VALUE);
        props.put(ConsumerConfig.RECONNECT_BACKOFF_MAX_MS_CONFIG, RECONNECT_BACKOFF_MAX_MS_CONFIG_CONSTANT_VALUE);
        
        props.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, SASL_PLAINTEXT);
        props.put(SaslConfigs.SASL_MECHANISM, SASL_PLAIN);
        props.put(SaslConfigs.SASL_JAAS_CONFIG,String.format(SASL_JAAS_CONFIG, PlainLoginModule.class.getName(), this.appConfig.getTowerConfig(clusterId).get("username"), this.appConfig.getTowerConfig(clusterId).get("password")));

        props.put(ConsumerConfig.GROUP_ID_CONFIG, "INTERNAL_GROUP");
        return new KafkaConsumer<>(props);
    }

    public KafkaConsumer<String, String> createConsumer(String clusterId) {
        Map<String, Object> props = appConfig.getKafkaProperties().buildConsumerProperties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, appConfig.getTowerConfig(clusterId).get("bootstrap-server"));
        props.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, this.appConfig.getTowerConfig(clusterId).get("protocol"));
        props.put(SaslConfigs.SASL_MECHANISM, this.appConfig.getTowerConfig(clusterId).get("mechanism"));
        props.put(SaslConfigs.SASL_JAAS_CONFIG,String.format(SASL_JAAS_CONFIG, PlainLoginModule.class.getName(), this.appConfig.getTowerConfig(clusterId).get("username"), this.appConfig.getTowerConfig(clusterId).get("password")));
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        return new KafkaConsumer<>(props);
    } 
}
