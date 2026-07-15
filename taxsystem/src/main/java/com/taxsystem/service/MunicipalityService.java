package com.taxsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.taxsystem.model.Municipality;
import com.taxsystem.repository.MunicipalityRepository;

@Service
public class MunicipalityService {

    private final MunicipalityRepository municipalityRepository;

    public MunicipalityService(MunicipalityRepository municipalityRepository) {
        this.municipalityRepository = municipalityRepository;
    }

    // Get All Municipalities
    public List<Municipality> getAllMunicipalities() {
        return municipalityRepository.findAll();
    }

    // Create Municipality
    public Municipality createMunicipality(Municipality municipality) {
        if (municipalityRepository.findByMunicipalityName(
            municipality.getMunicipalityName()).isPresent()) {
                throw new RuntimeException("Municipality already exists");
        }

        municipality.setId(null);

        return municipalityRepository.save(municipality);
    }

    // Update Municipality
    public Municipality updateMunicipality(Long id, Municipality municipality) {

        Municipality existingMunicipality = municipalityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Municipality not found"));

        existingMunicipality.setMunicipalityName(municipality.getMunicipalityName());

        return municipalityRepository.save(existingMunicipality);
    }

    // Delete Municipality
    public void deleteMunicipality(Long id) {

        municipalityRepository.deleteById(id);
    }

}