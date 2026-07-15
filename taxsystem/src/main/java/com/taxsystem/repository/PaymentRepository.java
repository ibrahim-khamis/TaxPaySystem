package com.taxsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taxsystem.model.MonthlyTax;
import com.taxsystem.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByPaymentReference(String paymentReference);

    Optional<Payment> findByMonthlyTax(MonthlyTax monthlyTax);

    //kutafuta payments za business moja.
    List<Payment> findByMonthlyTaxBusiness(com.taxsystem.model.Business business);

}