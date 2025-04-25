package com.qsp.pasandida.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.qsp.pasandida.model.User;
import com.qsp.pasandida.repo.UserRepo;

@Repository
public class UserDao {

	@Autowired
	private UserRepo userRepo;
	
	
	public User saveUser(User user) {
		return userRepo.save(user);
	}
	public Optional<User> findUserById(int userId) {
		Optional<User> user = userRepo.findById(userId);
		return user;
	}
	public User fetchUserByEmail(String email) {
		return userRepo.findByEmail(email);
	}
	public List<User> fetchAll(){
		return userRepo.findAll();
	}
}
