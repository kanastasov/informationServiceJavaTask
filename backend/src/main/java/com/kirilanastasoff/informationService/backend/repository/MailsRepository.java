package com.kirilanastasoff.informationService.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kirilanastasoff.informationService.backend.model.Addresses;
import com.kirilanastasoff.informationService.backend.model.Mails;
import com.kirilanastasoff.informationService.backend.model.People;

public interface MailsRepository extends JpaRepository<Mails, Long> {
	
	Optional<Mails> findByEmail(String email);

}
