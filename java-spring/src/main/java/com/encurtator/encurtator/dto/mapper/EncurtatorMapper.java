package com.encurtator.encurtator.dto.mapper;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import org.springframework.stereotype.Component;

import com.encurtator.encurtator.dto.EncurtatorDto;
import com.encurtator.encurtator.model.Encurtator;
import com.encurtator.encurtator.model.User;
import com.encurtator.encurtator.repository.UserRepository;
import com.encurtator.encurtator.utils.Utils;


@Component
public class EncurtatorMapper {
    private final UserRepository userRepository;

    public EncurtatorMapper(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public EncurtatorDto toDto(Encurtator encurtator) throws NoSuchAlgorithmException, InvalidKeySpecException, Exception{
        if(encurtator == null) return null;
        User user = userRepository.findById(encurtator.getUserId()).orElseThrow();
        return new EncurtatorDto(encurtator.getId(), encurtator.getshortUrl(), 
        Utils.decryptUrl(encurtator.getEncryptedUrl(), Utils.decodePrivateKey(user.getPrivateKey())), 
        encurtator.getUserId(), encurtator.getCreatedAt());
    }

    public Encurtator toEntity(EncurtatorDto encurtatorDto){
        if(encurtatorDto == null) return null;
        Encurtator encurtator = new Encurtator();
        if(encurtatorDto.id() != null) encurtator.setId(encurtatorDto.id());
        encurtator.setShortUrl(encurtatorDto.shortUrl());
        encurtator.setEncryptedUrl(encurtatorDto.encryptedUrl());
        encurtator.setCreatedAt(encurtatorDto.createAt());
        encurtator.setUserId(encurtatorDto.userId());
        return encurtator;
    }
}
