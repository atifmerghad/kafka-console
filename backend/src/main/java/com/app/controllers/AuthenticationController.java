package com.app.controllers;

import javax.swing.text.html.parser.Entity;

import com.app.kafka.broker.BrokersDto;
import org.apache.catalina.authenticator.SpnegoAuthenticator.AuthenticateAction;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import com.app.config.JwtUtils;
import com.app.dao.UserDao;
import com.app.dto.AuthenticationRequest;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserDao userDao;
    private final JwtUtils jwtUtils;


    @PostMapping("/api/v1/greetings")
    public ResponseEntity<String> hello(@RequestBody AuthenticationRequest request) {
        request.setEmail("atif@gmail.com");
        request.setPassword("1234");
        return ResponseEntity.ok("Email : "+ request.getEmail());
    }

    @PostMapping("/api/v1/auth/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest request){
        request.setEmail("atif@gmail.com");
        request.setPassword("1234");
        System.out.println("----------> Start ------------ :"+request.getEmail()+" - "+ request.getPassword());

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        System.out.println("Try to find user : ");
        final UserDetails  user = userDao.findUserByEmail(request.getEmail());
        if(user != null){
            System.out.println("user defined !"+ user.getUsername());
            System.out.println("generateToken : "+ jwtUtils.generateToken(user));
            return ResponseEntity.ok(jwtUtils.generateToken(user));
        }
        return ResponseEntity.status(400).body("some error has occured");
    }
    
}
