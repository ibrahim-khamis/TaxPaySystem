package com.taxsystem.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BusinessMonthlyTaxDTO {

    private Long id;

    private Integer billingMonth;

    private Integer billingYear;

    private Double amount;

    private Double penalty;

    private Double totalAmount;

    private LocalDate billingDate;

    private LocalDate dueDate;

    private String status;

    private String controlNumber;

}