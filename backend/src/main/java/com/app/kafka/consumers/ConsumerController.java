package com.app.kafka.consumers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import lombok.AllArgsConstructor;
import com.app.kafka.topics.MessageDto;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@SuppressWarnings("java:S6212")
public class ConsumerController {

    ConsumerService consumerService;

    @GetMapping("/api/consume/{topicName}/{partition}")
    public MessageDto getTopicMessages(@PathVariable("topicName") String topicName,
                                             @PathVariable("partition") String partitions,
                                             @RequestParam("page") String pageParam,
                                             @RequestParam("limit") String limitParam,
                                             @RequestParam(value = "beginningTimestampMillis", required = false) Long beginningTimestampMillis,
                                             @RequestParam(value = "endTimestampMillis", required = false) Long endTimestampMillis,
                                             @RequestParam(value = "offset", required = false) Long offset,
                                             @RequestParam("clusterId") String clusterId) throws Exception {
        return consumerService.getTopicMessages(topicName, partitions, pageParam, limitParam, beginningTimestampMillis, endTimestampMillis, offset, clusterId);
    }
   
}
