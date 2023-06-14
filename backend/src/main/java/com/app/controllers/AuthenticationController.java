package com.app.controllers;

import javax.swing.text.html.parser.Entity;

import org.apache.catalina.authenticator.SpnegoAuthenticator.AuthenticateAction;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.config.JwtUtils;
import com.app.dao.UserDao;
import com.app.dto.AuthenticationRequest;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserDao userDao;
    private final JwtUtils jwtUtils;

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest request){
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );   
        final UserDetails  user = userDao.findUserByEmail(request.getEmail());
        if(user != null){
            return ResponseEntity.ok(jwtUtils.generateToken(user));
        }
        return ResponseEntity.status(400).body("some error has occured");
    }
    
}
