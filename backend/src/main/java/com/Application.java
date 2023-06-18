package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.app.kafka.config.AppConfig;

@CrossOrigin(origins = "*")
@SpringBootApplication
public class Application {

    public static void  main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
        AppConfig appConfig = new AppConfig();
    }
}
