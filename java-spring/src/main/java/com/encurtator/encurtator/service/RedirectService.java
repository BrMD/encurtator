package com.encurtator.encurtator.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.encurtator.encurtator.exception.RecordNotFoundException;
import com.encurtator.encurtator.model.Encurtator;
import com.encurtator.encurtator.model.User;
import com.encurtator.encurtator.repository.EncurtatorRepository;
import com.encurtator.encurtator.repository.UserRepository;
import com.encurtator.encurtator.utils.Utils;

@Service
@Validated
public class RedirectService {
    private final EncurtatorRepository encurtatorRepository;
    private final UserRepository userRepository;
    public RedirectService(EncurtatorRepository encurtatorRepository, UserRepository userRepository){
        this.encurtatorRepository = encurtatorRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> findByshortUrl(String shortUrl) throws Exception{
        try {
            Encurtator result = encurtatorRepository.findByshortUrl(shortUrl);
            User user = userRepository.findById(result.getUserId()).orElseThrow(() -> new RecordNotFoundException(result.getUserId()));
            return ResponseEntity.ok("{\"url\": \"" + Utils.decryptUrl(result.getEncryptedUrl(), Utils.decodePrivateKey(user.getPrivateKey())) + "\"}"); 
            
        } catch (Exception e) {
            return ResponseEntity.status(404).body("{\"error\": \"" + e + "\"}");
        }
        
    }
}
