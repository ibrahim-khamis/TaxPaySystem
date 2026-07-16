package com.taxsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.taxsystem.dto.BusinessDashboardDTO;
import com.taxsystem.dto.BusinessDetailsDTO;
import com.taxsystem.dto.BusinessRequestDTO;
import com.taxsystem.model.Business;
import com.taxsystem.model.BusinessType;
import com.taxsystem.model.MonthlyTax;
import com.taxsystem.model.Municipality;
import com.taxsystem.model.User;
import com.taxsystem.repository.BusinessRepository;
import com.taxsystem.repository.BusinessTypeRepository;
import com.taxsystem.repository.MonthlyTaxRepository;
import com.taxsystem.repository.MunicipalityRepository;
import com.taxsystem.repository.UserRepository;


@Service
public class BusinessService {

    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;
    private final MunicipalityRepository municipalityRepository;
    private final BusinessTypeRepository businessTypeRepository;
    private final MonthlyTaxRepository monthlyTaxRepository;
    

    public BusinessService(
            BusinessRepository businessRepository,
            UserRepository userRepository,
            MunicipalityRepository municipalityRepository,
            BusinessTypeRepository businessTypeRepository,
        MonthlyTaxRepository monthlyTaxRepository) {

        this.businessRepository = businessRepository;
        this.userRepository = userRepository;
        this.municipalityRepository = municipalityRepository;
        this.businessTypeRepository = businessTypeRepository;
        this.monthlyTaxRepository = monthlyTaxRepository;
    }

    // ===========================
    // DASHBOARD STATISTICS
    // ===========================

    public long getTotalBusinesses() {
        return businessRepository.count();
    }

    public long getActiveBusinesses() {
        return businessRepository.countByStatus("ACTIVE");
    }

    public long getPendingBusinesses() {
        return businessRepository.countByStatus("PENDING");
    }

    public long getRejectedBusinesses() {
        return businessRepository.countByStatus("REJECTED");
    }

    // ===========================
    // GET ALL BUSINESSES
    // ===========================

    public List<Business> getAllBusinesses() {
        return businessRepository.findAll();
    }

    // ===========================
    // GET BUSINESS BY ID
    // ===========================

    public Business getBusinessById(Long id) {

        return businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found"));

    }

    // ===========================
    // GET PENDING BUSINESSES
    // ===========================

    public List<Business> getPendingBusinessesList() {

        return businessRepository.findByStatus("PENDING");

    }


    // ===========================
    // GET ACTIVE BUSINESSES
    // ===========================

    public List<Business> getActiveBusinessesList() {

        return businessRepository.findByStatus("ACTIVE");

    }

    // ===========================
    // CREATE BUSINESS
    // ===========================

    public Business createBusiness(BusinessRequestDTO request) {

        if (businessRepository.findByBusinessNumber(
                request.getBusinessNumber()).isPresent()) {

            throw new RuntimeException("Business Number already exists");

        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Municipality municipality = municipalityRepository
                .findById(request.getMunicipalityId())
                .orElseThrow(() -> new RuntimeException("Municipality not found"));

        BusinessType businessType = businessTypeRepository
                .findById(request.getBusinessTypeId())
                .orElseThrow(() -> new RuntimeException("Business Type not found"));

        Business business = new Business();

        business.setBusinessName(request.getBusinessName());
        business.setBusinessNumber(request.getBusinessNumber());
        business.setLocation(request.getLocation());

        business.setStatus("PENDING");

        business.setUser(user);
        business.setMunicipality(municipality);
        business.setBusinessType(businessType);

        return businessRepository.save(business);

    }

    // ===========================
    // UPDATE BUSINESS
    // ===========================

    public Business updateBusiness(Long id, BusinessRequestDTO request) {

        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        Business existingBusiness = businessRepository
                .findByBusinessNumber(request.getBusinessNumber())
                .orElse(null);

        if (existingBusiness != null &&
                !existingBusiness.getId().equals(id)) {

            throw new RuntimeException("Business Number already exists");

        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Municipality municipality = municipalityRepository
                .findById(request.getMunicipalityId())
                .orElseThrow(() -> new RuntimeException("Municipality not found"));

        BusinessType businessType = businessTypeRepository
                .findById(request.getBusinessTypeId())
                .orElseThrow(() -> new RuntimeException("Business Type not found"));

        business.setBusinessName(request.getBusinessName());
        business.setBusinessNumber(request.getBusinessNumber());
        business.setLocation(request.getLocation());

        business.setUser(user);
        business.setMunicipality(municipality);
        business.setBusinessType(businessType);

        return businessRepository.save(business);

    }

    // ===========================
    // APPROVE BUSINESS
    // ===========================

    public Business approveBusiness(Long id) {

        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        if ("ACTIVE".equals(business.getStatus())) {

            throw new RuntimeException("Business already active.");

        }

        business.setStatus("ACTIVE");

        return businessRepository.save(business);

    }

    // ===========================
    // REJECT BUSINESS
    // ===========================

    public Business rejectBusiness(Long id) {

        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        if ("REJECTED".equals(business.getStatus())) {

            throw new RuntimeException("Business already rejected.");

        }

        business.setStatus("REJECTED");

        return businessRepository.save(business);

    }

    // ===========================
    // DELETE BUSINESS
    // ===========================

    public void deleteBusiness(Long id) {

        if (!businessRepository.existsById(id)) {

            throw new RuntimeException("Business not found");

        }

        businessRepository.deleteById(id);

    }

    // ===========================
    // BUSINESS OWNER DASHBOARD
    // ===========================

    public BusinessDashboardDTO getBusinessDashboard(User user) {

        Business business = businessRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Business not found"));

        BusinessDashboardDTO dashboard = new BusinessDashboardDTO();

        dashboard.setBusinessName(
                business.getBusinessName());

        dashboard.setMonthlyTax(
                business.getBusinessType().getMonthlyTax());

        /*
         * Kwa sasa tunaweka status ya Business.
         * Baadaye tutabadilisha iwe status ya Monthly Tax.
         */

        MonthlyTax latestTax = monthlyTaxRepository
                .findTopByBusinessOrderByBillingYearDescBillingMonthDesc(business)
                .orElse(null);

        if (latestTax == null) {

            dashboard.setPaymentStatus("UNPAID");

    }      else {

            dashboard.setPaymentStatus(latestTax.getStatus());

    }
        return dashboard;

    }

     //===========================
    // MY BUSINESS
    // ===========================

    public BusinessDetailsDTO getMyBusiness(User user) {

        Business business = businessRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Business not found"));

        BusinessDetailsDTO dto = new BusinessDetailsDTO();  

        dto.setBusinessName(
                business.getBusinessName());

        dto.setBusinessNumber(
                business.getBusinessNumber());

        dto.setLocation(
            business.getLocation());

        dto.setMunicipality(
            business.getMunicipality()
                    .getMunicipalityName());

        dto.setBusinessType(
            business.getBusinessType()
                    .getBusinessTypeName());

        dto.setMonthlyTax(
            business.getBusinessType()
                    .getMonthlyTax());

        dto.setStatus(
            business.getStatus());

        return dto;

    }

}

