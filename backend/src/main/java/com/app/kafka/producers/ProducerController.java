package com.app.kafka.producers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.kafka.topics.Message;

import lombok.AllArgsConstructor;


@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ProducerController {
    
    private final ProducerService producerService;

    @PostMapping("/api/producer/produce/{topicName}")
    public void send(@PathVariable("topicName") String topicName,
            @RequestBody Message message,
            @RequestParam("clusterId") String clusterId) throws Exception {
            System.out.println("Message : "+ message);
            producerService.produce(topicName, message, clusterId);
    } 
}
 