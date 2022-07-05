package com.kirilanastasoff.informationService.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "mails")
public class Mails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotNull
	@Column(name = "email_type", length = 5)
	private String emailType;

	@Email
	@Column(name = "email", length = 40)
	private String email;

	@JsonBackReference
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "people_id", referencedColumnName = "id")
	private People people;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmailType() {
		return emailType;
	}

	public void setEmailType(String emailType) {
		this.emailType = emailType;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public People getPeople() {
		return people;
	}

	public void setPeople(People people) {
		this.people = people;
	}

	public Mails() {
		super();
	}

	public Mails(@NotNull String emailType, @Email String email, People people) {
		super();
		this.emailType = emailType;
		this.email = email;
		this.people = people;
	}

	public Mails(long id, @NotNull String emailType, @Email String email, People people) {
		super();
		this.id = id;
		this.emailType = emailType;
		this.email = email;
		this.people = people;
	}

}
