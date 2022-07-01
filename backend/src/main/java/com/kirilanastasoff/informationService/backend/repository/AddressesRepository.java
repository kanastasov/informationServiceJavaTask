package com.kirilanastasoff.informationService.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kirilanastasoff.informationService.backend.model.Addresses;

public interface AddressesRepository extends JpaRepository<Addresses, Long> {
}
