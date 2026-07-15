package com.taxsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taxsystem.model.Business;
import com.taxsystem.model.User;

public interface BusinessRepository extends JpaRepository<Business, Long> {

    Optional<Business> findByBusinessNumber(String businessNumber);
     List<Business> findByStatus(String status);

     long countByStatus(String status);

     Optional<Business> findByUser(User user);

     

}