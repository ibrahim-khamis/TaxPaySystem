package com.taxsystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "businesses")
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String businessName;

    @Column(nullable = false, unique = true, length = 100)
    private String businessNumber;

    @Column(nullable = false, length = 150)
    private String location;

    @Column(nullable = false, length = 20)
    private String status;

    // Relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Relationship with Municipality
    @ManyToOne
    @JoinColumn(name = "municipality_id")
    private Municipality municipality;

    // Relationship with Business Type
    @ManyToOne
    @JoinColumn(name = "business_type_id")
    private BusinessType businessType;

}