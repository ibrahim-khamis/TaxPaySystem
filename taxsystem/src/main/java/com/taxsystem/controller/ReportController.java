package com.taxsystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taxsystem.model.Payment;
import com.taxsystem.service.DashboardService;
import com.taxsystem.service.PaymentService;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    private final DashboardService dashboardService;
    private final PaymentService paymentService;

    public ReportController(
            DashboardService dashboardService,
            PaymentService paymentService) {

        this.dashboardService = dashboardService;
        this.paymentService = paymentService;

    }

    @GetMapping
    public ResponseEntity<?> getReport() {

        Map<String, Object> report = new HashMap<>();

        report.put("dashboard", dashboardService.getDashboard());

        List<Payment> payments = paymentService.getAllPayments();

        report.put("payments", payments);

        return ResponseEntity.ok(report);

    }

}