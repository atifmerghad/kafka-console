
## TODO LIST

1.Brokers
    - List : In progress
2.Topics
    - Create : Done/50%
    - Delete : Done/50%
3. Tracking:
    - Operations :
        - Track whro do the action

4. Authentication
    - User based
    - Role based





docker run -p 8088:8080 \
  -e KAFKA_BROKERS=pkc-6ojv2.us-west4.gcp.confluent.cloud:9092 \
  -e KAFKA_TLS_ENABLED=true \
  -e KAFKA_SASL_ENABLED=true \
  -e KAFKA_SASL_MECHANISM=PLAIN \
  -e KAFKA_SASL_USERNAME="DMPZETAYAA5A2QW6" \
  -e KAFKA_SASL_PASSWORD="mdXVzeyKWidTU/2vWTsphBnRcJoU00DKM5gdMuWJs0s9U6Y4tbqsOTFR7a7+qcAn" \
  -e PLAIN_AUTHENTICATION_ENABLED=true \
  -e REDPANDA_CONSOLE_CREDENTIALS="username=atif&password=password" \
  docker.redpanda.com/vectorized/console:latest


APIS : 
 Request timed out after 25 sec: ./api/topics
 Request timed out after 25 sec: ./api/topics
 Request timed out after 25 sec: ./api/cluster
 Request timed out after 25 sec: ./api/cluster
 Request timed out after 25 sec: ./api/cluster
 Request timed out after 25 sec: ./api/schemas
 Request timed out after 25 sec: ./api/cluster/overview
 Request timed out after 25 sec: ./api/brokers


Overview : 
    - All
        - Cluster Status
        - Cluster Storage Size
        - Cluster Version
        - Brokers Online
        - Topics
        - Replicas
    
    - BROKER DETAILS
    - CLUSTER DETAILS : 
        - SERVICES
            Kafka Connect : Not configured
            Schema Registry : Not configured
        - STORAGE :
            Total Bytes : 534 kiB
            Primary : 485 kiB
            Replicated : 49.9 kiB
        - SECURITY : 
            Service Accounts :Admin API not configured
            ACLs : 0
    