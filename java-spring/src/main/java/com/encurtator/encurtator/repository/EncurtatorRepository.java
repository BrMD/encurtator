package com.encurtator.encurtator.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.encurtator.encurtator.model.Encurtator;

public interface EncurtatorRepository extends JpaRepository<Encurtator, UUID> {
    Encurtator findByshortUrl(String shortUrl);
    List<Encurtator> findByUserId(UUID userId);
}
