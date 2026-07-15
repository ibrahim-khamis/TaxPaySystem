package com.taxsystem.dto;

import lombok.Data;

@Data
public class RegisterUserDTO {

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String username;

    private String password;

}