package com.kirilanastasoff.informationService.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kirilanastasoff.informationService.backend.model.Addresses;
import com.kirilanastasoff.informationService.backend.model.People;

public interface PeopleRepository extends JpaRepository<People, Long> {

	List<People> findByFullName(String fullName);
}
