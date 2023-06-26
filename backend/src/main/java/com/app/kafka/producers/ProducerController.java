package com.app.kafka.producers;

import java.util.concurrent.CompletableFuture;

import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.utils.Bytes;
import org.springframework.kafka.support.SendResult;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.kafka.topics.Message;

import lombok.AllArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ProducerController {
    
    private final ProducerService producerService;

    private final Logger logger = LoggerFactory.getLogger(ProducerController.class);

    @PostMapping("/api/producer/produce/{topicName}")
    public  CompletableFuture<Message> send(@PathVariable("topicName") String topicName,
            @RequestBody Message message,
            @RequestParam("clusterId") String clusterId) throws Exception {
            System.out.println("Message : "+ message);
            CompletableFuture<Message> completableFuture = new CompletableFuture<>();
            
            ListenableFuture<SendResult<Bytes, Bytes>> future = producerService.produce(topicName, message, clusterId);
            future.addCallback(new ListenableFutureCallback<SendResult<Bytes, Bytes>>() {
                @Override
                public void onSuccess(SendResult<Bytes, Bytes> result) {
                    RecordMetadata metadata = result.getRecordMetadata();
                    logger.info("onSuccess : Acknowledgement received. Offset: {} ", metadata.offset());
                                        
                    completableFuture.complete(Message.builder().offset( metadata.offset())
                    .partition(metadata.partition())
                    .timestamp(metadata.timestamp())
                    .value(message.getValue()).build());
                }
                @Override
                public void onFailure(Throwable ex) {
                    logger.info("onFailure : Failed to produce : {} ", ex);
                    completableFuture.completeExceptionally(ex);
                }
            });
            return completableFuture;

    } 
}
 