package com.taxsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taxsystem.model.Municipality;

public interface MunicipalityRepository extends JpaRepository<Municipality, Long>{
    Optional<Municipality> findByMunicipalityName(String municipalityName);

}