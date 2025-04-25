package com.qsp.pasandida.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.qsp.pasandida.dao.UserDao;
import com.qsp.pasandida.model.AuthRequest;
import com.qsp.pasandida.model.AuthResponse;
import com.qsp.pasandida.model.User;
import com.qsp.pasandida.util.JwtUtil;
import com.qsp.pasandida.util.ResponseStructure;

@Service
public class AuthService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private JwtUtil jwtUtil;

	public ResponseEntity<?> login(AuthRequest authRequest) {
		User user = userDao.fetchUserByEmail(authRequest.getEmail());

		if (user != null && user.getPassword().equals(authRequest.getPassword())) {
			String token = jwtUtil.generateToken(user.getEmail());

			AuthResponse<User> authResponse = new AuthResponse<>();
			authResponse.setToken(token);
			authResponse.setMessage("Login Successful");
			authResponse.setData(user);
			
			return ResponseEntity.ok(authResponse);

//			ResponseStructure<AuthResponse> structure = new ResponseStructure<>();
//			structure.setMessage("Login Successful");
//			structure.setStatusCode(HttpStatus.OK.value());
//			structure.setData(authResponse);

//			return new ResponseEntity<>(structure, HttpStatus.OK);
		} else {
			throw new RuntimeException("Invalid Credentials");
		}
	}

}
