package com.encurtator.encurtator.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.encurtator.encurtator.model.Session;

public interface SessionRepository extends JpaRepository<Session, UUID> {
    
}
