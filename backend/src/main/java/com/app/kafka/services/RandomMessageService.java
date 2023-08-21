package com.app.kafka.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class RandomMessageService {

    private final SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    public RandomMessageService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedRate = 5000) // Send every 5 seconds
    public void sendRandomMessage() {
        String randomMessage = generateRandomMessage();
        messagingTemplate.convertAndSend("/topic/randomMessages", randomMessage);
    }

    private String generateRandomMessage() {
        String udid = UUID.randomUUID().toString();
        return "{\"user\": \"test user\", \"udid\": \"" + udid + "\"}";
    }
}
