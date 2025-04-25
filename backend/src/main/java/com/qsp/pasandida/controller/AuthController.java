
package com.qsp.pasandida.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qsp.pasandida.model.AuthRequest;
import com.qsp.pasandida.model.AuthResponse;
import com.qsp.pasandida.service.AuthService;
import com.qsp.pasandida.util.ResponseStructure;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	 @PostMapping("/login") public
	ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
		return authService.login(authRequest);
	}

}
