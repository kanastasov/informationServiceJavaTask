package com.kirilanastasoff.informationService.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kirilanastasoff.informationService.backend.model.Addresses;
import com.kirilanastasoff.informationService.backend.model.Mails;

public interface MailsRepository extends JpaRepository<Mails, Long> {
}
