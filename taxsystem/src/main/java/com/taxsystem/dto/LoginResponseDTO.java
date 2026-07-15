package com.taxsystem.dto;

import com.taxsystem.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {

    private String token;

    private User user;

}