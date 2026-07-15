package com.taxsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taxsystem.model.BusinessType;
import com.taxsystem.service.BusinessTypeService;

@RestController
@RequestMapping("/api/v1/business-types")
public class BusinessTypeController {

    private final BusinessTypeService businessTypeService;

    public BusinessTypeController(BusinessTypeService businessTypeService) {
        this.businessTypeService = businessTypeService;
    }

    // ===========================
    // GET ALL BUSINESS TYPES
    // ===========================
    @GetMapping
    public ResponseEntity<List<BusinessType>> getAllBusinessTypes() {

        return ResponseEntity.ok(
                businessTypeService.getAllBusinessTypes());

    }

    // ===========================
    // CREATE BUSINESS TYPE
    // ===========================
    @PostMapping
    public ResponseEntity<BusinessType> create(
            @RequestBody BusinessType businessType) {

        BusinessType savedBusinessType =
                businessTypeService.createBusinessType(businessType);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedBusinessType);

    }

    // ===========================
    // UPDATE BUSINESS TYPE
    // ===========================
    @PutMapping("/{id}")
    public ResponseEntity<BusinessType> update(

            @PathVariable Long id,

            @RequestBody BusinessType businessType) {

        return ResponseEntity.ok(

                businessTypeService.updateBusinessType(id, businessType));

    }

    // ===========================
    // DELETE BUSINESS TYPE
    // ===========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(

            @PathVariable Long id) {

        businessTypeService.deleteBusinessType(id);

        return ResponseEntity.ok(
                "Business Type deleted successfully");

    }

}