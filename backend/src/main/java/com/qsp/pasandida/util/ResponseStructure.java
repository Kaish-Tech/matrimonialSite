package com.qsp.pasandida.util;

import org.springframework.stereotype.Component;

@Component
public class ResponseStructure<T> {

	private String message;
	private T data;
	private int statusCode;
	
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
}
