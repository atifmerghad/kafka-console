FROM eclipse-temurin:17
VOLUME /tmp
ARG JAR_FILE
ADD ${JAR_FILE} app.jar
RUN mkdir /config/

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar", "--spring.config.name=tower", "--spring.config.additional-location=/config/"]
