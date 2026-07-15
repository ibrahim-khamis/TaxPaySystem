package com.taxsystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taxsystem.dto.LoginRequestDTO;
import com.taxsystem.dto.LoginResponseDTO;
import com.taxsystem.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ==========================
    // LOGIN
    // ==========================
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequestDTO request) {

        try {

            LoginResponseDTO response = authService.login(request);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(e.getMessage());

        }

    }

}