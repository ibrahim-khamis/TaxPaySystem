package com.taxsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taxsystem.dto.PaymentRequestDTO;
import com.taxsystem.model.Payment;
import com.taxsystem.model.User;
import com.taxsystem.service.PaymentService;
import com.taxsystem.service.UserService;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;

    public PaymentController(PaymentService paymentService,
        UserService userService) {
        this.paymentService = paymentService;
         this.userService = userService;
    }

    // Get All Payments
    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {

        return ResponseEntity.ok(paymentService.getAllPayments());

    }

    // Make Payment
    @PostMapping
    public ResponseEntity<Payment> makePayment(
            @RequestBody PaymentRequestDTO request) {

        Payment payment = paymentService.makePayment(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(payment);

    }

    // ===========================
// BUSINESS OWNER PAYMENTS
// ===========================

    @GetMapping("/my-payments")
    public ResponseEntity<List<Payment>> getMyPayments(
            Authentication authentication) {

        User user = userService.findByUsername(
                authentication.getName());

        return ResponseEntity.ok(
                paymentService.getMyPayments(user));

    }

}