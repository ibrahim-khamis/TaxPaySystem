package com.taxsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taxsystem.dto.BusinessMonthlyTaxDTO;
import com.taxsystem.model.MonthlyTax;
import com.taxsystem.model.User;
import com.taxsystem.service.MonthlyTaxService;
import com.taxsystem.service.UserService;

@RestController
@RequestMapping("/api/v1/monthly-taxes")
public class MonthlyTaxController {

    private final MonthlyTaxService monthlyTaxService;
    private final UserService userService;

    public MonthlyTaxController(
            MonthlyTaxService monthlyTaxService,
            UserService userService) {

        this.monthlyTaxService = monthlyTaxService;
        this.userService = userService;

    }

    // ===========================
    // GET ALL MONTHLY TAXES (ADMIN)
    // ===========================

    @GetMapping
    public ResponseEntity<List<MonthlyTax>> getAllMonthlyTaxes() {

        return ResponseEntity.ok(
                monthlyTaxService.getAllMonthlyTaxes());

    }

    // ===========================
    // BUSINESS OWNER MONTHLY TAXES
    // ===========================

    @GetMapping("/my-taxes")
    public ResponseEntity<List<BusinessMonthlyTaxDTO>> getMyMonthlyTaxes(
            Authentication authentication) {

        User user = userService.findByUsername(
                authentication.getName());

        return ResponseEntity.ok(
                monthlyTaxService.getMyMonthlyTaxes(user));

    }

    // ===========================
    // GENERATE MONTHLY TAX
    // ===========================

    @PostMapping("/generate/{businessId}")
    public ResponseEntity<MonthlyTax> generateMonthlyTax(
            @PathVariable Long businessId) {

        MonthlyTax monthlyTax =
                monthlyTaxService.generateMonthlyTax(businessId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(monthlyTax);

    }

    // ===========================
    // GENERATE CONTROL NUMBER
    // ===========================

    @PostMapping("/generate-control-number/{monthlyTaxId}")
    public ResponseEntity<MonthlyTax> generateControlNumber(
            @PathVariable Long monthlyTaxId) {

        MonthlyTax monthlyTax =
                monthlyTaxService.generateControlNumber(monthlyTaxId);

        return ResponseEntity.ok(monthlyTax);

    }

    // ===========================
    // APPLY PENALTY
    // ===========================

    @PostMapping("/apply-penalty")
    public ResponseEntity<String> applyPenalty() {

        monthlyTaxService.applyPenalty();

        return ResponseEntity.ok(
                "Penalty applied successfully.");

    }

    // ===========================
    // UPDATE MONTHLY TAX
    // ===========================

    @PutMapping("/{id}")
    public ResponseEntity<MonthlyTax> update(
            @PathVariable Long id,
            @RequestBody MonthlyTax monthlyTax) {

        return ResponseEntity.ok(
                monthlyTaxService.updateMonthlyTax(
                        id,
                        monthlyTax));

    }

    // ===========================
    // DELETE MONTHLY TAX
    // ===========================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id) {

        monthlyTaxService.deleteMonthlyTax(id);

        return ResponseEntity.ok(
                "Monthly Tax deleted successfully");

    }

}