package com.qsp.pasandida.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qsp.pasandida.model.User;

public interface UserRepo extends JpaRepository<User, Integer> {

	User findByEmail(String email);
}
