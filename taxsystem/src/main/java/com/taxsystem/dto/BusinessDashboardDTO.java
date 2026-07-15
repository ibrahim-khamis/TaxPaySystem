package com.taxsystem.dto;

import lombok.Data;

@Data
public class BusinessDashboardDTO {

    private String businessName;

    private Double monthlyTax;

    private String paymentStatus;

    private Double totalPaid;

}