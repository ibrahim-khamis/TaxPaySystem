package com.taxsystem.service;

import org.springframework.stereotype.Service;

import com.taxsystem.dto.LoginRequestDTO;
import com.taxsystem.dto.LoginResponseDTO;
import com.taxsystem.dto.RegisterRequestDTO;
import com.taxsystem.model.Business;
import com.taxsystem.model.User;
import com.taxsystem.repository.BusinessRepository;
import com.taxsystem.repository.UserRepository;
import com.taxsystem.security.JwtService;


@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, BusinessRepository businessRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.businessRepository = businessRepository;
        this.jwtService = jwtService;
    }

    public LoginResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("Invalid username or password"));

        if (!user.getPassword().equals(request.getPassword())) {

            throw new RuntimeException("Invalid username or password");

        }


        if ("BUSINESS_OWNER".equals(user.getRole())) {
            Business business = businessRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Business not found"));

            if (!"ACTIVE".equals(business.getStatus())) {

                throw new RuntimeException("Your business is not approved yet.");

            }

        }

        String token = jwtService.generateToken(user.getUsername());

        return new LoginResponseDTO(token, user);

    }

    public void register(RegisterRequestDTO request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'register'");
    }

}