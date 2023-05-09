package com.tower.security;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import com.tower.services.KafkaConnectionService;
import lombok.AllArgsConstructor;



@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor 
public class SecurityController {
    private final KafkaConnectionService kafkaConnectionService;

}
