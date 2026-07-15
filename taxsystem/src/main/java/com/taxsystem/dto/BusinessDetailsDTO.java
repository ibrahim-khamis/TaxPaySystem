package com.taxsystem.dto;

import lombok.Data;

@Data
public class BusinessDetailsDTO {

    private String businessName;

    private String businessNumber;

    private String location;

    private String municipality;

    private String businessType;

    private Double monthlyTax;

    private String status;

    private String ownerName;

    private String phone;

    private String email;

}