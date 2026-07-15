package com.taxsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.taxsystem.model.BusinessType;
import com.taxsystem.repository.BusinessTypeRepository;

@Service
public class BusinessTypeService {

    private final BusinessTypeRepository businessTypeRepository;

    public BusinessTypeService(BusinessTypeRepository businessTypeRepository) {
        this.businessTypeRepository = businessTypeRepository;
    }

    // Get All Business Types
    public List<BusinessType> getAllBusinessTypes() {

        return businessTypeRepository.findAll();

    }

    // Create Business Type
    public BusinessType createBusinessType(BusinessType businessType) {

        if (businessTypeRepository.findByBusinessTypeName(
                businessType.getBusinessTypeName()).isPresent()) {

            throw new RuntimeException("Business Type already exists");

        }

        businessType.setId(null);

        return businessTypeRepository.save(businessType);

    }

    // Update Business Type
    public BusinessType updateBusinessType(Long id, BusinessType businessType) {

        BusinessType existingBusinessType = businessTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business Type not found"));

        existingBusinessType.setBusinessTypeName(
                businessType.getBusinessTypeName());

        existingBusinessType.setMonthlyTax(
                businessType.getMonthlyTax());

        return businessTypeRepository.save(existingBusinessType);

    }

    // Delete Business Type
    public void deleteBusinessType(Long id) {

        businessTypeRepository.deleteById(id);

    }

}