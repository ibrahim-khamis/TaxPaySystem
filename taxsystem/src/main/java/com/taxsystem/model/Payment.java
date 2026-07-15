package com.taxsystem.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String paymentReference;

    @Column(nullable = false)
    private Double amountPaid;

    @Column(nullable = false)
    private LocalDateTime paymentDate;

    @Column(nullable = false, length = 20)
    private String paymentMethod;

    @Column(nullable = false, length = 20)
    private String status;

    @OneToOne
    @JoinColumn(name = "monthly_tax_id")
    private MonthlyTax monthlyTax;

}