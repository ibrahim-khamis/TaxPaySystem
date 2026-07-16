package com.taxsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taxsystem.model.Business;
import com.taxsystem.model.MonthlyTax;

public interface MonthlyTaxRepository extends JpaRepository<MonthlyTax, Long> {

    // Get all taxes for one business
    List<MonthlyTax> findByBusiness(Business business);

    // Check if monthly tax already exists for a business in a specific month and year
    Optional<MonthlyTax> findByBusinessAndBillingMonthAndBillingYear(
            Business business,
            Integer billingMonth,
            Integer billingYear);

    Optional<MonthlyTax> findByControlNumber(String controlNumber);

    List<MonthlyTax> findByStatus(String status);

    long countByStatus(String status);

    Optional<MonthlyTax> findTopByBusinessOrderByBillingYearDescBillingMonthDesc(
        Business business);

    

}
