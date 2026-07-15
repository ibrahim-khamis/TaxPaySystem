package com.taxsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taxsystem.model.BusinessType;

public interface BusinessTypeRepository extends JpaRepository<BusinessType, Long> {

    Optional<BusinessType> findByBusinessTypeName(String businessTypeName);

}