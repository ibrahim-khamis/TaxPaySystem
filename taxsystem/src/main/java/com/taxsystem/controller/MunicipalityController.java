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

import com.taxsystem.model.Municipality;
import com.taxsystem.service.MunicipalityService;

@RestController
@RequestMapping("/api/v1/municipalities")
public class MunicipalityController {

    private final MunicipalityService municipalityService;

    public MunicipalityController(MunicipalityService municipalityService) {
        this.municipalityService = municipalityService;
    }

    // Get All Municipalities
    @GetMapping
    public ResponseEntity<List<Municipality>> getAllMunicipalities() {

        return ResponseEntity.ok(municipalityService.getAllMunicipalities());

    }

    // Create Municipality
    @PostMapping
    public ResponseEntity<Municipality> create(@RequestBody Municipality municipality) {

        Municipality savedMunicipality = municipalityService.createMunicipality(municipality);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedMunicipality);

    }

    // Update Municipality
    @PutMapping("/{id}")
    public ResponseEntity<Municipality> update(@PathVariable Long id,
            @RequestBody Municipality municipality) {

        return ResponseEntity.ok(municipalityService.updateMunicipality(id, municipality));

    }

    // Delete Municipality
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {

        municipalityService.deleteMunicipality(id);

        return ResponseEntity.ok("Municipality deleted successfully");

    }

}