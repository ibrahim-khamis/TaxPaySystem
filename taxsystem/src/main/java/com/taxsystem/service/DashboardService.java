package com.taxsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.taxsystem.dto.DashboardDTO;
import com.taxsystem.model.Payment;
import com.taxsystem.repository.BusinessRepository;
import com.taxsystem.repository.MonthlyTaxRepository;
import com.taxsystem.repository.PaymentRepository;
import com.taxsystem.repository.UserRepository;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    private final MonthlyTaxRepository monthlyTaxRepository;
    private final PaymentRepository paymentRepository;

    public DashboardService(
            UserRepository userRepository,
            BusinessRepository businessRepository,
            MonthlyTaxRepository monthlyTaxRepository,
            PaymentRepository paymentRepository) {

        this.userRepository = userRepository;
        this.businessRepository = businessRepository;
        this.monthlyTaxRepository = monthlyTaxRepository;
        this.paymentRepository = paymentRepository;
    }

    public DashboardDTO getDashboard() {

        DashboardDTO dashboard = new DashboardDTO();

        dashboard.setTotalUsers(userRepository.count());

        dashboard.setTotalBusinesses(businessRepository.count());

        dashboard.setActiveBusinesses(
                businessRepository.countByStatus("ACTIVE"));

        dashboard.setPendingBusinesses(
                businessRepository.countByStatus("PENDING"));

        dashboard.setRejectedBusinesses(
                businessRepository.countByStatus("REJECTED"));

        dashboard.setTotalMonthlyTaxes(
                monthlyTaxRepository.count());

        dashboard.setPaidTaxes(
                monthlyTaxRepository.countByStatus("PAID"));

        dashboard.setUnpaidTaxes(
                monthlyTaxRepository.countByStatus("UNPAID"));

        dashboard.setOverdueTaxes(
                monthlyTaxRepository.countByStatus("OVERDUE"));

        List<Payment> payments = paymentRepository.findAll();

        double totalRevenue = payments.stream()
                .mapToDouble(Payment::getAmountPaid)
                .sum();

        dashboard.setTotalRevenue(totalRevenue);

        return dashboard;

    }

}