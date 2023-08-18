package com.app.kafka.schemas;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class SchemaRegistryController {

    @Value("${schema-registry.url}")
    private String schemaRegistryUrl;

    @GetMapping("/schema-registries")
    public ResponseEntity<List<SchemaRegistryDetails>> getSchemaRegistries() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map<String, Integer>> response = restTemplate.exchange(
                schemaRegistryUrl + "/subjects", HttpMethod.GET, null, new ParameterizedTypeReference<Map<String, Integer>>() {});

        List<SchemaRegistryDetails> schemaRegistries = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : response.getBody().entrySet()) {
            String subject = entry.getKey();
            Integer version = entry.getValue();

            ResponseEntity<Map<String, Object>> subjectResponse = restTemplate.exchange(
                    schemaRegistryUrl + "/subjects/" + subject + "/versions/" + version, HttpMethod.GET, null,
                    new ParameterizedTypeReference<Map<String, Object>>() {});

            SchemaRegistryDetails schemaRegistry = new SchemaRegistryDetails();
            schemaRegistry.setSubject(subject);
            schemaRegistry.setVersion(version);
            schemaRegistry.setId((Integer) subjectResponse.getBody().get("id"));
            schemaRegistry.setSchema((String) subjectResponse.getBody().get("schema"));

            schemaRegistries.add(schemaRegistry);
        }

        return ResponseEntity.ok(schemaRegistries);
    }
}
