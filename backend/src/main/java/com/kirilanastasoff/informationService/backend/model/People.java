package com.kirilanastasoff.informationService.backend.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "people")
public class People {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Pattern(regexp = "^[\\p{L} .'-]+$")
	@NotNull
	@Column(name = "full_name", length = 90)
	private String fullName;

	@Size(min = 10, max = 10)
	@Column(name = "pin", length = 10)
	private String pin;

	@LazyCollection(LazyCollectionOption.FALSE)
	@JsonManagedReference(
//			value = "mails"
	)
	@OneToMany(mappedBy = "people", orphanRemoval = true, cascade = { CascadeType.MERGE, CascadeType.DETACH,
			CascadeType.PERSIST, CascadeType.REMOVE })
	private List<Mails> mails = new ArrayList();

	@LazyCollection(LazyCollectionOption.FALSE)
	@JsonManagedReference(
//			value = "addresses"
	)
	@OneToMany(mappedBy = "people", orphanRemoval = true, cascade = { CascadeType.MERGE, CascadeType.DETACH,
			CascadeType.PERSIST, CascadeType.REMOVE })
	private List<Addresses> addresses = new ArrayList();

	
	
	public long getId() {
		return id;
	}

	

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public List<Mails> getMails() {
		return mails;
	}

	public void setMails(List<Mails> mails) {
		this.mails = mails;
	}

	public List<Addresses> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<Addresses> addresses) {
		this.addresses = addresses;
	}

	public People() {
		super();
	}
	
	

	public People(long id, @Pattern(regexp = "^[\\p{L} .'-]+$") @NotNull String fullName,
			@Size(min = 10, max = 10) String pin) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.pin = pin;
	}

//	public People(@Pattern(regexp = "^[\\p{L} .'-]+$") @NotNull String fullName, @Size(min = 10, max = 10) String pin) {
//		super();
//		this.fullName = fullName;
//		this.pin = pin;
//	}

	public People(@Pattern(regexp = "^[\\p{L} .'-]+$") @NotNull String fullName, @Size(min = 10, max = 10) String pin,
			List<Mails> mails, List<Addresses> addresses) {
		super();
		this.fullName = fullName;
		this.pin = pin;
		this.mails = mails;
		this.addresses = addresses;
	}

	public People(long id, @Pattern(regexp = "^[\\p{L} .'-]+$") @NotNull String fullName,
			@Size(min = 10, max = 10) String pin, List<Mails> mails, List<Addresses> addresses) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.pin = pin;
		this.mails = mails;
		this.addresses = addresses;
	}
	
	
	
	

}
