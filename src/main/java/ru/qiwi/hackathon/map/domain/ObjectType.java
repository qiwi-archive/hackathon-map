package ru.qiwi.hackathon.map.domain;

import com.google.gson.Gson;
import qiwi.core.access.definition.Operable;

import static qiwi.core.access.AccessMode.READ;

@Operable(READ)
public class ObjectType {

	private Integer hqotId;
	private String hqotName;
	private String hqotDescription;

	public String getHqotDescription() {
		return hqotDescription;
	}

	public void setHqotDescription(String hqotDescription) {
		this.hqotDescription = hqotDescription;
	}

	public Integer getHqotId() {
		return hqotId;
	}

	public void setHqotId(Integer hqotId) {
		this.hqotId = hqotId;
	}

	public String getHqotName() {
		return hqotName;
	}

	public void setHqotName(String hqotName) {
		this.hqotName = hqotName;
	}

	public String toString() {
		Gson gson = new Gson();
		return gson.toJson(this);
	}
}
