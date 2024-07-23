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

    public String findByShortUrl(String shortUrl){
        Encurtator result = encurtatorRepository.findByShortUrl(shortUrl);
        return result.getEncryptedUrl();
    }
}
