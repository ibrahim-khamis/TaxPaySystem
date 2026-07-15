package com.taxsystem.service;

import org.springframework.stereotype.Service;

import com.taxsystem.dto.RegisterRequestDTO;
import com.taxsystem.model.Business;
import com.taxsystem.model.BusinessType;
import com.taxsystem.model.Municipality;
import com.taxsystem.model.User;
import com.taxsystem.repository.BusinessRepository;
import com.taxsystem.repository.BusinessTypeRepository;
import com.taxsystem.repository.MunicipalityRepository;
import com.taxsystem.repository.UserRepository;

@Service
public class RegisterService {

    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    private final MunicipalityRepository municipalityRepository;
    private final BusinessTypeRepository businessTypeRepository;

    public RegisterService(
            UserRepository userRepository,
            BusinessRepository businessRepository,
            MunicipalityRepository municipalityRepository,
            BusinessTypeRepository businessTypeRepository) {

        this.userRepository = userRepository;
        this.businessRepository = businessRepository;
        this.municipalityRepository = municipalityRepository;
        this.businessTypeRepository = businessTypeRepository;

    }

    public void register(RegisterRequestDTO request) {

        // Check username
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Check email
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Check business number
        if (businessRepository.findByBusinessNumber(request.getBusinessNumber()).isPresent()) {
            throw new RuntimeException("Business Number already exists");
        }

        Municipality municipality = municipalityRepository
                .findById(request.getMunicipalityId())
                .orElseThrow(() -> new RuntimeException("Municipality not found"));

        BusinessType businessType = businessTypeRepository
                .findById(request.getBusinessTypeId())
                .orElseThrow(() -> new RuntimeException("Business Type not found"));

        // Save User
        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setRole("BUSINESS_OWNER");

        User savedUser = userRepository.save(user);

        // Save Business
        Business business = new Business();

        business.setBusinessName(request.getBusinessName());
        business.setBusinessNumber(request.getBusinessNumber());
        business.setLocation(request.getLocation());

        business.setStatus("PENDING");

        business.setUser(savedUser);
        business.setMunicipality(municipality);
        business.setBusinessType(businessType);

        businessRepository.save(business);

    }

}