package com.tower.security;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tower.services.KafkaConnectionService;

import lombok.AllArgsConstructor;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.CreateAclsResult;
import org.apache.kafka.common.acl.AccessControlEntry;
import org.apache.kafka.common.acl.AccessControlEntryFilter;
import org.apache.kafka.common.acl.AclBinding;
import org.apache.kafka.common.acl.AclBindingFilter;
import org.apache.kafka.common.acl.AclOperation;
import org.apache.kafka.common.acl.AclPermissionType;
import org.apache.kafka.common.resource.PatternType;
import org.apache.kafka.common.resource.ResourcePattern;
import org.apache.kafka.common.resource.ResourcePatternFilter;
import org.apache.kafka.common.resource.ResourceType;

import java.util.*;


@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor 
public class AclController {
    private final KafkaConnectionService kafkaConnectionService;

        //    Principal    | Permission | Operation | Resource Type | Resource Name | Pattern Type
        @GetMapping("/api/acls/")
        public List<ACL> getACL(@RequestParam("clusterId") String clusterId) throws ExecutionException, InterruptedException {
            AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);
            
            ResourcePatternFilter resourceFilter = new ResourcePatternFilter(ResourceType.ANY, null, PatternType.ANY);
            AccessControlEntryFilter entryFilter = AccessControlEntryFilter.ANY;
            AclBindingFilter aclFilter = new AclBindingFilter(resourceFilter, entryFilter);
            Collection<AclBinding> aclBindings = adminClient.describeAcls(aclFilter).values().get();
      
            return aclBindings.stream()
                    .map(aclBinding -> ACL.builder()
                            .principal(aclBinding.entry().principal().toString())
                            .permission(aclBinding.entry().permissionType().toString())
                            .operation(aclBinding.entry().operation().toString())
                            .resourceType(aclBinding.pattern().resourceType().toString())
                            .resourceName(aclBinding.pattern().name())
                            .patternType(aclBinding.pattern().patternType().toString())
                            .build())
                    .collect(Collectors.toList());
        }
        
        
        
        @PostMapping("/api/acl")
        public ResponseEntity<String> createAcl(@RequestParam("clusterId") String clusterId,
                                                @RequestParam("principal") String principal,
                                                @RequestParam("permission") String permission,
                                                @RequestParam("operation") String operation,
                                                @RequestParam("resourceType") String resourceType,
                                                @RequestParam("resourceName") String resourceName,
                                                @RequestParam("patternType") String patternType) throws ExecutionException, InterruptedException {
        
            AdminClient adminClient = kafkaConnectionService.getAdminClient(clusterId);
        
            ResourceType aclResourceType = ResourceType.valueOf(resourceType.toUpperCase());
            ResourcePattern aclResourcePattern = new ResourcePattern(aclResourceType, resourceName, PatternType.valueOf(patternType.toUpperCase()));
            AccessControlEntry aclEntry = new AccessControlEntry(principal, "*", AclOperation.valueOf(operation.toUpperCase()), AclPermissionType.valueOf(permission.toUpperCase()));
            AclBinding aclBinding = new AclBinding(aclResourcePattern, aclEntry);
        
            CreateAclsResult createAclsResult = adminClient.createAcls(Collections.singleton(aclBinding));
            createAclsResult.all().get(); // wait for the Acl creation to finish
        
            return ResponseEntity.ok("ACL created successfully");
        }
}
