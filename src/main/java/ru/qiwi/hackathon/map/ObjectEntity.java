package ru.qiwi.hackathon.map;

import com.google.gson.Gson;
import qiwi.core.access.definition.Operable;

import static qiwi.core.access.AccessMode.READ;

@Operable(READ)
public class ObjectEntity {

	private Long hqoId;
	private Long hqoPlace;
	private Long hqoType;
	private Long hqoName;
	private Long hqplId;
	private Long hqplType;
	private Long hqP2PPlace;
	private Long hqP2PPoint;
	private Long hqP2POrder;
	private Long hqptId;
	private Double hqptX;
	private Double hqptY;
	private Long hqptFloor;

	public Long getHqplId() {
		return hqplId;
	}

	public void setHqplId(Long hqplId) {
		this.hqplId = hqplId;
	}

	public Long getHqplType() {
		return hqplType;
	}

	public void setHqplType(Long hqplType) {
		this.hqplType = hqplType;
	}

	public Long getHqP2PPlace() {
		return hqP2PPlace;
	}

	public void setHqP2PPlace(Long hqP2PPlace) {
		this.hqP2PPlace = hqP2PPlace;
	}

	public Long getHqP2PPoint() {
		return hqP2PPoint;
	}

	public void setHqP2PPoint(Long hqP2PPoint) {
		this.hqP2PPoint = hqP2PPoint;
	}

	public Long getHqP2POrder() {
		return hqP2POrder;
	}

	public void setHqP2POrder(Long hqP2POrder) {
		this.hqP2POrder = hqP2POrder;
	}

	public Long getHqptId() {
		return hqptId;
	}

	public void setHqptId(Long hqptId) {
		this.hqptId = hqptId;
	}

	public Double getHqptX() {
		return hqptX;
	}

	public void setHqptX(Double hqptX) {
		this.hqptX = hqptX;
	}

	public Double getHqptY() {
		return hqptY;
	}

	public void setHqptY(Double hqptY) {
		this.hqptY = hqptY;
	}

	public Long getHqptFloor() {
		return hqptFloor;
	}

	public void setHqptFloor(Long hqptFloor) {
		this.hqptFloor = hqptFloor;
	}

	public Long getHqoId() {
		return hqoId;
	}

	public void setHqoId(Long hqoId) {
		this.hqoId = hqoId;
	}

	public Long getHqoPlace() {
		return hqoPlace;
	}

	public void setHqoPlace(Long hqoPlace) {
		this.hqoPlace = hqoPlace;
	}

	public Long getHqoType() {
		return hqoType;
	}

	public void setHqoType(Long hqoType) {
		this.hqoType = hqoType;
	}

	public Long getHqoName() {
		return hqoName;
	}

	public void setHqoName(Long hqoName) {
		this.hqoName = hqoName;
	}

	public String toString() {
		Gson gson = new Gson();
        return gson.toJson(this);
	}
}
