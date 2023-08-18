package com.app.kafka.connectors;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ConnectController {
    
    private static final String KAFKA_CONNECT_URL = "http://<kafka-connect-host>:<port>/connectors";

    @GetMapping("/connectors")
    public ResponseEntity<List<String>> getConnectorNames() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String[]> response = restTemplate.getForEntity(KAFKA_CONNECT_URL, String[].class);
        List<String> connectorNames = List.of(response.getBody());
        return ResponseEntity.ok(connectorNames);
    }

    @GetMapping("/connector-details")
    public ResponseEntity<List<ConnectorDetails>> getConnectorDetails() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String[]> response = restTemplate.getForEntity(KAFKA_CONNECT_URL, String[].class);
        List<String> connectorNames = List.of(response.getBody());

        List<ConnectorDetails> connectorDetailsList = new ArrayList<>();
        for (String connectorName : connectorNames) {
            ResponseEntity<String> connectorResponse = restTemplate.getForEntity(KAFKA_CONNECT_URL + "/" + connectorName, String.class);
            // Parse the connectorResponse JSON and create ConnectorDetails object
           // ConnectorDetails connectorDetails = objectMapper.readValue(connectorResponse.getBody(), ConnectorDetails.class);
        //  connectorDetailsList.add(connectorDetails);
        }

        return ResponseEntity.ok(connectorDetailsList);
    }
    
}
