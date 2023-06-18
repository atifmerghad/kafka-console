package com.app.kafka.security;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import com.app.kafka.services.KafkaConnectionService;
import lombok.AllArgsConstructor;



@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor 
public class SecurityController {
    private final KafkaConnectionService kafkaConnectionService;

}
