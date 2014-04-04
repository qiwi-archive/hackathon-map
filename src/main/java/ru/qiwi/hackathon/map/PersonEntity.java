package ru.qiwi.hackathon.map;

public class PersonEntity {

		private Long id;
		private String fio;
		private Long place;
		private Long tlf;
		private String floor;
		private String email;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFio() {
		return fio;
	}

	public void setFio(String fio) {
		this.fio = fio;
	}

	public Long getPlace() {
		return place;
	}

	public void setPlace(Long place) {
		this.place = place;
	}

	public Long getTlf() {
		return tlf;
	}

	public void setTlf(Long tlf) {
		this.tlf = tlf;
	}

	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
