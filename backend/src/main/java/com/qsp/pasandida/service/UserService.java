package com.qsp.pasandida.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.qsp.pasandida.dao.UserDao;
import com.qsp.pasandida.model.User;
import com.qsp.pasandida.util.ResponseStructure;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	ResponseStructure<User> responseStructure;
	
	public User saveUser(User user) {
		return userDao.saveUser(user);
	}
	public List<User> fetchAll(){
		return userDao.fetchAll();
	}
	public ResponseEntity<ResponseStructure<User>> checkUser(User user) {
		String femail = user.getEmail();
		String fpass = user.getPassword();
		User buser = userDao.fetchUserByEmail(femail);
		if(buser!=null) {
			if(buser.getPassword().equals(fpass)) {
				responseStructure.setMessage("Login Successfully");
				responseStructure.setStatusCode(HttpStatus.OK.value());
				responseStructure.setData(buser);
				
				return new ResponseEntity<ResponseStructure<User>>(responseStructure,HttpStatus.OK);
			}
		}
		responseStructure.setMessage("Login Failed");
		responseStructure.setStatusCode(HttpStatus.NOT_FOUND.value());
		responseStructure.setData(buser);
		
		return new ResponseEntity<ResponseStructure<User>>(responseStructure,HttpStatus.NOT_FOUND);
	
	}
	public byte[] getImageById(int userId) {
        Optional<User> userOptional = userDao.findUserById(userId);  // Get user by ID
        if (userOptional.isPresent()) {
            return userOptional.get().getImage();  // If user exists, return the image as byte[]
        }
        return null;  // If user not found, return null (or you can throw a custom exception)
    }
}
