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
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "addresses")
public class Addresses {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@JsonBackReference
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "people_id", referencedColumnName = "id")
	private People people;

	@NotNull
	@Column(name = "addr_type", length = 5)
	private String addrType;

	@Column(name = "addr_info", length = 300)
	private String addrInfo;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public People getPeople() {
		return people;
	}

	public void setPeople(People people) {
		this.people = people;
	}

	public String getAddrType() {
		return addrType;
	}

	public void setAddrType(String addrType) {
		this.addrType = addrType;
	}

	public String getAddrInfo() {
		return addrInfo;
	}

	public void setAddrInfo(String addrInfo) {
		this.addrInfo = addrInfo;
	}
	
	

	public Addresses() {
		super();
	}

	public Addresses(long id, People people, @NotNull String addrType, String addrInfo) {
		super();
		this.id = id;
		this.people = people;
		this.addrType = addrType;
		this.addrInfo = addrInfo;
	}
	
	
	
	
	

}
