package com.taxsystem.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.taxsystem.dto.PaymentRequestDTO;
import com.taxsystem.model.Business;
import com.taxsystem.model.MonthlyTax;
import com.taxsystem.model.Payment;
import com.taxsystem.model.User;
import com.taxsystem.repository.BusinessRepository;
import com.taxsystem.repository.MonthlyTaxRepository;
import com.taxsystem.repository.PaymentRepository;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final MonthlyTaxRepository monthlyTaxRepository;
    private final BusinessRepository businessRepository;

    public PaymentService(PaymentRepository paymentRepository,
            MonthlyTaxRepository monthlyTaxRepository,
        BusinessRepository businessRepository) {

        this.paymentRepository = paymentRepository;
        this.monthlyTaxRepository = monthlyTaxRepository;
        this.businessRepository = businessRepository;
        
    }

    // Get All Payments
    public List<Payment> getAllPayments() {

        return paymentRepository.findAll();

    }

    // Make Payment
    public Payment makePayment(PaymentRequestDTO request) {

        MonthlyTax monthlyTax = monthlyTaxRepository
                .findByControlNumber(request.getControlNumber())
                .orElseThrow(() -> new RuntimeException("Invalid Control Number"));

        // Check if already paid
        if (monthlyTax.getStatus().equals("PAID")) {
            throw new RuntimeException("Monthly Tax already paid.");
        }

        Payment payment = new Payment();

        payment.setPaymentReference(generatePaymentReference());

        payment.setAmountPaid(monthlyTax.getTotalAmount());

        payment.setPaymentDate(LocalDateTime.now());

        payment.setPaymentMethod(request.getPaymentMethod());

        payment.setStatus("SUCCESS");

        payment.setMonthlyTax(monthlyTax);

        // Update Monthly Tax Status
        monthlyTax.setStatus("PAID");

        monthlyTaxRepository.save(monthlyTax);

        return paymentRepository.save(payment);

    }

    // Generate Payment Reference
    private String generatePaymentReference() {

        long count = paymentRepository.count() + 1;

        return String.format("PAY-%06d", count);

    }


    // ===========================
// BUSINESS OWNER PAYMENTS
// ===========================

    public List<Payment> getMyPayments(User user) {

        Business business = businessRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Business not found"));

        return paymentRepository
                .findByMonthlyTaxBusiness(business);

    }

}