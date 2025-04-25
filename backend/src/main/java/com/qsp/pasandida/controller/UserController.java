package com.qsp.pasandida.controller;


import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qsp.pasandida.model.User;
import com.qsp.pasandida.service.UserService;
import com.qsp.pasandida.util.ResponseStructure;

import jakarta.servlet.http.HttpServletRequest;


//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;
	
//	@RequestMapping("/")
//	public String greet() {
//		return "welcome";
//	}
	
	@PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> registerUser(
	        @RequestParam String email,
	        @RequestParam String name,
	        @RequestParam String password,
	        @RequestParam int age,
	        @RequestParam String gender,
	        @RequestParam String job,
	        @RequestParam("educationQualification") String educationQualification,
	        @RequestParam String zodiacSign,
	        @RequestParam String religion,
	        @RequestParam String about,
	        @RequestParam String family,
	        @RequestParam String area,
	        @RequestParam("state") String userState,
	        @RequestParam int pin,
	        @RequestParam("hobbies") String hobbiesJson,
	        @RequestParam("interests") String interestsJson,
	        @RequestParam MultipartFile image
	) {
	    try {
	        ObjectMapper mapper = new ObjectMapper();
	        List<String> hobbies = mapper.readValue(hobbiesJson, new TypeReference<List<String>>() {});
	        List<String> interests = mapper.readValue(interestsJson, new TypeReference<List<String>>() {});

	        User user = new User();
	        user.setEmail(email);
	        user.setName(name);
	        user.setPassword(password);
	        user.setAge(age);
	        user.setGender(gender);
	        user.setJob(job);
	        user.setEducationQualification(educationQualification);
	        user.setZodiacSign(zodiacSign);
	        user.setReligion(religion);
	        user.setAbout(about);
	        user.setFamily(family);
	        user.setArea(area);
	        user.setState(userState);
	        user.setPin(pin);
	        user.setHobbies(hobbies);
	        user.setInterests(interests);
	        user.setImage(image.getBytes());

	        userService.saveUser(user);

	        // ✅ Return custom success response
	        Map<String, String> response = new HashMap<>();
	        response.put("message", "User registered successfully");
	        return ResponseEntity.ok(response);

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body(Collections.singletonMap("message", "Error while registering user"));
	    }
	}
//	@PostMapping("/login")
//	public ResponseEntity<ResponseStructure<User>> checkUser(@RequestBody User user) {
//        return userService.checkUser(user);
//	}
	@GetMapping("/filter-user")
	public List<User> fetchAll(){
		return userService.fetchAll();
	}
	@GetMapping("/img/{id}")
    public byte[] getImage(@PathVariable int id) {
        return userService.getImageById(id);  // Delegate the logic to UserService
    }
	
//	@GetMapping("/csrf-Token")
//	public CsrfToken getCsrfToken(HttpServletRequest request) {
//		return (CsrfToken) request.getAttribute("_csrf");
//	}
}
