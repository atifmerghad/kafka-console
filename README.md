
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

## KAFKA


## FRONTEND

## BACKEND

swagger : http://localhost:8080/swagger-ui/index.html#/

## DOCKER


Build : docker build -t my-app .   
Run : docker run -d -p 3300:80 my-app

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

## KUBERNETES


## DEBUG 

frontend :  npm run start:dev
backend :  /usr/bin/env /opt/homebrew/Cellar/openjdk@11/11.0.15/libexec/openjdk.jdk/Contents/Home/bin/java @/var/folders/mp/s6v23cx54jj7fpy48cz9wm400000gn/T/cp_78lwa07h986znzse7a9v2pmzv.argfile com.Application




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
