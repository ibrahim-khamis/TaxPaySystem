package com.taxsystem.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "monthly_taxes")
public class MonthlyTax {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer billingMonth;

    @Column(nullable = false)
    private Integer billingYear;

    @Column(nullable = false)
    private LocalDate billingDate;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private Double penalty;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false, length = 20)
    private String status;

    @Column(nullable = false)
    private Boolean penaltyApplied;

    @Column(unique = true, length = 30)
    private String controlNumber;

    @Column(nullable = false)
    private Boolean controlNumberGenerated;

    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;

}