package com.taxsystem.dto;

import lombok.Data;

@Data
public class PaymentRequestDTO {

    private String controlNumber;

    private String paymentMethod;

}