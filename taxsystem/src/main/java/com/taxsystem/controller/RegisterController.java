package com.taxsystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taxsystem.dto.RegisterRequestDTO;
import com.taxsystem.service.RegisterService;

@RestController
@RequestMapping("/api/v1/auth")
public class RegisterController {

    private final RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequestDTO request) {

        try {

            registerService.register(request);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Registration submitted successfully. Please wait for administrator approval.");

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

}