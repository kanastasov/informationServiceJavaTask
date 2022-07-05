package com.kirilanastasoff.informationService.backend.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kirilanastasoff.informationService.backend.model.Addresses;
import com.kirilanastasoff.informationService.backend.model.Mails;
import com.kirilanastasoff.informationService.backend.model.People;
import com.kirilanastasoff.informationService.backend.repository.AddressesRepository;
import com.kirilanastasoff.informationService.backend.repository.MailsRepository;
import com.kirilanastasoff.informationService.backend.repository.PeopleRepository;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class PeopleController {

	@Autowired
	private PeopleRepository peopleRepository;

	@Autowired
	private MailsRepository mailsRepository;

	@Autowired
	private AddressesRepository addressesRepository;

	@GetMapping("/people")
	public ResponseEntity<List<People>> getAllPeople(@RequestParam(required = false) String fullName) {
		try {
			List<People> people = new ArrayList<People>();
			if (fullName == null)
				peopleRepository.findAll().forEach(people::add);
			else
				peopleRepository.findByFullName(fullName).forEach(people::add);
			if (people.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(people, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/people/{id}")
	public ResponseEntity<People> getTutorialById(@PathVariable("id") long id) {
		Optional<People> productData = peopleRepository.findById(id);
		if (productData.isPresent()) {
			return new ResponseEntity<>(productData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/people")
	public ResponseEntity<People> createProduct(@RequestBody LinkedHashMap<Object, Object> product) {

		try {
			String fullName = "";
			String pin = "";
			String email = "";
			String emailType = "";
			String address = "";
			String addressType = "";

			for (Entry<Object, Object> entry : product.entrySet()) {
				if (entry.getKey().equals("fullName")) {
					fullName = (String) entry.getValue();
				} else if (entry.getKey().equals("pin")) {
					pin = (String) entry.getValue();
				} else if (entry.getKey().equals("email")) {
					email = (String) entry.getValue();
				} else if (entry.getKey().equals("emailType")) {
					emailType = (String) entry.getValue();
				} else if (entry.getKey().equals("address")) {
					address = (String) entry.getValue();
				} else if (entry.getKey().equals("addressType")) {
					addressType = (String) entry.getValue();
				}

//				System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());
			}

			Optional<Mails> mails = mailsRepository.findByEmail(email);

			if (mails.isPresent()) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			}

			People _product = peopleRepository.save(new People(fullName, pin));

			Mails _mails = mailsRepository.save(new Mails(emailType, email, _product));
			Addresses _addresses = addressesRepository.save(new Addresses(_product, addressType, address));

			return new ResponseEntity<>(_product, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/people/{id}")
	public ResponseEntity<People> updateProduct(@PathVariable("id") long id, @RequestBody People product) {
		Optional<People> productData = peopleRepository.findById(id);
		if (productData.isPresent()) {
			People _product = productData.get();
			_product.setFullName(product.getFullName());
			_product.setPin(product.getPin());
			return new ResponseEntity<>(peopleRepository.save(_product), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/people/{id}")
	public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") long id) {
		try {
			peopleRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/people")
	public ResponseEntity<HttpStatus> deleteAllProducts() {
		try {
			peopleRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
