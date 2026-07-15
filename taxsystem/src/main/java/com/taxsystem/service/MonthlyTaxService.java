package com.taxsystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.taxsystem.dto.BusinessMonthlyTaxDTO;
import com.taxsystem.model.Business;
import com.taxsystem.model.MonthlyTax;
import com.taxsystem.model.User;
import com.taxsystem.repository.BusinessRepository;
import com.taxsystem.repository.MonthlyTaxRepository;

@Service
public class MonthlyTaxService {

    private final MonthlyTaxRepository monthlyTaxRepository;
    private final BusinessRepository businessRepository;

    public MonthlyTaxService(
            MonthlyTaxRepository monthlyTaxRepository,
            BusinessRepository businessRepository) {

        this.monthlyTaxRepository = monthlyTaxRepository;
        this.businessRepository = businessRepository;
    }

    // ===========================
    // GET ALL MONTHLY TAXES
    // ===========================

    public List<MonthlyTax> getAllMonthlyTaxes() {

        return monthlyTaxRepository.findAll();

    }

    // ===========================
    // GENERATE MONTHLY TAX
    // ===========================

    public MonthlyTax generateMonthlyTax(Long businessId) {

        Business business = businessRepository.findById(businessId)
                .orElseThrow(() ->
                        new RuntimeException("Business not found"));

        if (!business.getStatus().equals("ACTIVE")) {

            throw new RuntimeException("Business is not active.");

        }

        LocalDate today = LocalDate.now();

        Integer month = today.getMonthValue();

        Integer year = today.getYear();

        if (monthlyTaxRepository
                .findByBusinessAndBillingMonthAndBillingYear(
                        business,
                        month,
                        year)
                .isPresent()) {

            throw new RuntimeException(
                    "Monthly Tax already generated.");

        }

        Double amount =
                business.getBusinessType().getMonthlyTax();

        MonthlyTax monthlyTax = new MonthlyTax();

        monthlyTax.setBillingMonth(month);

        monthlyTax.setBillingYear(year);

        monthlyTax.setBillingDate(today);

        monthlyTax.setDueDate(
                LocalDate.of(year, month, 29));

        monthlyTax.setAmount(amount);

        monthlyTax.setPenalty(0.0);

        monthlyTax.setTotalAmount(amount);

        monthlyTax.setStatus("UNPAID");

        monthlyTax.setPenaltyApplied(false);

        monthlyTax.setControlNumberGenerated(false);

        monthlyTax.setControlNumber(null);

        monthlyTax.setBusiness(business);

        return monthlyTaxRepository.save(monthlyTax);

    }

    // ===========================
    // GENERATE UNIQUE CONTROL NUMBER
    // ===========================

    private String generateControlNumber() {

        LocalDate today = LocalDate.now();

        String yearMonth = String.format(
                "%d%02d",
                today.getYear(),
                today.getMonthValue());

        long count = monthlyTaxRepository.count() + 1;

        return String.format(
                "CN-%s-%06d",
                yearMonth,
                count);

    }

    // ===========================
    // APPLY PENALTY
    // ===========================

    public void applyPenalty() {

        List<MonthlyTax> monthlyTaxes =
                monthlyTaxRepository.findByStatus("UNPAID");

        LocalDate today = LocalDate.now();

        for (MonthlyTax monthlyTax : monthlyTaxes) {

            if (today.isAfter(monthlyTax.getDueDate())
                    && !monthlyTax.getPenaltyApplied()) {

                double penalty = 5000.0;

                monthlyTax.setPenalty(penalty);

                monthlyTax.setTotalAmount(
                        monthlyTax.getAmount() + penalty);

                monthlyTax.setStatus("OVERDUE");

                monthlyTax.setPenaltyApplied(true);

                monthlyTaxRepository.save(monthlyTax);

            }

        }

    }

    // ===========================
    // UPDATE MONTHLY TAX
    // ===========================

    public MonthlyTax updateMonthlyTax(
            Long id,
            MonthlyTax monthlyTax) {

        MonthlyTax existingMonthlyTax =
                monthlyTaxRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Monthly Tax not found"));

        existingMonthlyTax.setStatus(
                monthlyTax.getStatus());

        return monthlyTaxRepository.save(
                existingMonthlyTax);

    }

    // ===========================
    // GENERATE CONTROL NUMBER
    // ===========================

    public MonthlyTax generateControlNumber(
            Long monthlyTaxId) {

        MonthlyTax monthlyTax =
                monthlyTaxRepository.findById(monthlyTaxId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Monthly Tax not found"));

        if (monthlyTax.getControlNumberGenerated()) {

            throw new RuntimeException(
                    "Control Number already generated.");

        }

        String controlNumber =
                generateControlNumber();

        monthlyTax.setControlNumber(controlNumber);

        monthlyTax.setControlNumberGenerated(true);

        return monthlyTaxRepository.save(monthlyTax);

    }

    // ===========================
    // DELETE MONTHLY TAX
    // ===========================

    public void deleteMonthlyTax(Long id) {

        monthlyTaxRepository.deleteById(id);

    }

    // ===========================
    // BUSINESS OWNER MONTHLY TAXES
    // ===========================

    public List<BusinessMonthlyTaxDTO> getMyMonthlyTaxes(
            User user) {

        Business business = businessRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Business not found"));

        List<MonthlyTax> monthlyTaxes =
                monthlyTaxRepository.findByBusiness(business);

        return monthlyTaxes.stream().map(monthlyTax -> {

            BusinessMonthlyTaxDTO dto =
                    new BusinessMonthlyTaxDTO();

            dto.setId(
                    monthlyTax.getId());

            dto.setBillingMonth(
                    monthlyTax.getBillingMonth());

            dto.setBillingYear(
                    monthlyTax.getBillingYear());

            dto.setAmount(
                    monthlyTax.getAmount());

            dto.setPenalty(
                    monthlyTax.getPenalty());

            dto.setTotalAmount(
                    monthlyTax.getTotalAmount());

            dto.setBillingDate(
                    monthlyTax.getBillingDate());

            dto.setDueDate(
                    monthlyTax.getDueDate());

            dto.setStatus(
                    monthlyTax.getStatus());

            dto.setControlNumber(
                    monthlyTax.getControlNumber());

            return dto;

        }).collect(Collectors.toList());

    }

}