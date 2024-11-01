package com.encurtator.encurtator.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.encurtator.encurtator.model.User;



public interface UserRepository  extends JpaRepository<User, UUID>{
    User findByEmail(String Email);
    Boolean existsByEmail(String Email);
}
