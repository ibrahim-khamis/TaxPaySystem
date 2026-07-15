package com.taxsystem.dto;

import lombok.Data;

@Data
public class RegisterRequestDTO {

    // User Information
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String username;
    private String password;

    // Business Information
    private String businessName;
    private String businessNumber;
    private String location;

    private Long municipalityId;
    private Long businessTypeId;

}