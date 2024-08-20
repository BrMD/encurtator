package com.encurtator.encurtator.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.encurtator.encurtator.dto.UserDto;
import com.encurtator.encurtator.service.AuthService;

import jakarta.validation.constraints.NotNull;


@RestController
@Validated
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto user)throws Exception{
        return authService.login(user);
    }

    @GetMapping("/getemail/{sessionId}")
    public ResponseEntity<?> getEmail(@PathVariable @NotNull UUID sessionId)throws Exception{
        return authService.getEmail(sessionId);
    }

    @DeleteMapping("/logout/{sessionId}")
    public void logout(@PathVariable @NotNull UUID sessionId)throws Exception{
        System.out.println(sessionId);
        authService.logout(sessionId);
    }
}
