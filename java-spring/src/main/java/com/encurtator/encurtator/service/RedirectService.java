package com.encurtator.encurtator.service;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.encurtator.encurtator.model.Encurtator;
import com.encurtator.encurtator.repository.EncurtatorRepository;

@Service
@Validated
public class RedirectService {
    private final EncurtatorRepository encurtatorRepository;
    public RedirectService(EncurtatorRepository encurtatorRepository){
        this.encurtatorRepository = encurtatorRepository;
    }

    public String findByshortUrl(String shortUrl){
        Encurtator result = encurtatorRepository.findByshortUrl(shortUrl);
        return result.getEncryptedUrl();
    }
}
