package com.taxsystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.taxsystem.dto.BusinessDashboardDTO;
import com.taxsystem.dto.BusinessDetailsDTO;
import com.taxsystem.dto.BusinessRequestDTO;
import com.taxsystem.model.Business;
import com.taxsystem.model.User;
import com.taxsystem.service.BusinessService;
import com.taxsystem.service.UserService;

@RestController
@RequestMapping("/api/v1/businesses")
public class BusinessController {

    private final BusinessService businessService;
    private final UserService userService;

    public BusinessController(
            BusinessService businessService,
            UserService userService) {

        this.businessService = businessService;
        this.userService = userService;
    }

    // ===========================
    // BUSINESS OWNER DASHBOARD
    // ===========================

    @GetMapping("/dashboard")
    public ResponseEntity<BusinessDashboardDTO> getBusinessDashboard(
            Authentication authentication) {

        User user = userService.findByUsername(
                authentication.getName());

        return ResponseEntity.ok(
                businessService.getBusinessDashboard(user));

    }

    // ===========================
    // BUSINESS STATISTICS
    // ===========================

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Long>> statistics() {

        Map<String, Long> data = new HashMap<>();

        data.put("total", businessService.getTotalBusinesses());

        data.put("active", businessService.getActiveBusinesses());

        data.put("pending", businessService.getPendingBusinesses());

        data.put("rejected", businessService.getRejectedBusinesses());

        return ResponseEntity.ok(data);

    }

    // ===========================
    // GET ALL BUSINESSES
    // ===========================

    @GetMapping
    public ResponseEntity<List<Business>> getAllBusinesses() {

        return ResponseEntity.ok(
                businessService.getAllBusinesses());

    }

    // ===========================
// GET ACTIVE BUSINESSES
// ===========================

@GetMapping("/active")
public ResponseEntity<List<Business>> getActiveBusinesses() {

    return ResponseEntity.ok(
            businessService.getActiveBusinessesList());

}

    // ===========================
    // GET PENDING BUSINESSES
    // ===========================

    @GetMapping("/pending")
    public ResponseEntity<List<Business>> getPendingBusinesses() {

        return ResponseEntity.ok(
                businessService.getPendingBusinessesList());

    }

    // ===========================
    // GET BUSINESS BY ID
    // ===========================

    @GetMapping("/{id}")
    public ResponseEntity<Business> getBusinessById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                businessService.getBusinessById(id));

    }

    // ===========================
    // CREATE BUSINESS
    // ===========================

    @PostMapping
    public ResponseEntity<Business> create(
            @RequestBody BusinessRequestDTO request) {

        Business business =
                businessService.createBusiness(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(business);

    }

    // ===========================
    // UPDATE BUSINESS
    // ===========================

    @PutMapping("/{id}")
    public ResponseEntity<Business> update(
            @PathVariable Long id,
            @RequestBody BusinessRequestDTO request) {

        return ResponseEntity.ok(
                businessService.updateBusiness(id, request));

    }

    // ===========================
    // APPROVE BUSINESS
    // ===========================

    @PutMapping("/{id}/approve")
    public ResponseEntity<Business> approveBusiness(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                businessService.approveBusiness(id));

    }

    // ===========================
    // REJECT BUSINESS
    // ===========================

    @PutMapping("/{id}/reject")
    public ResponseEntity<Business> rejectBusiness(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                businessService.rejectBusiness(id));

    }

    // ===========================
    // DELETE BUSINESS
    // ===========================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        businessService.deleteBusiness(id);

        return ResponseEntity.noContent().build();

    }


    // ===========================
// MY BUSINESS
// ===========================

@GetMapping("/my-business")
public ResponseEntity<BusinessDetailsDTO> getMyBusiness(
        Authentication authentication) {

    User user = userService.findByUsername(
            authentication.getName());

    return ResponseEntity.ok(
            businessService.getMyBusiness(user));

}

}