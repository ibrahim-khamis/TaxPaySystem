package com.taxsystem.dto;

import lombok.Data;

@Data
public class BusinessRequestDTO {

    private String businessName;

    private String businessNumber;

    private String location;

    private Long userId;

    private Long municipalityId;

    private Long businessTypeId;

}