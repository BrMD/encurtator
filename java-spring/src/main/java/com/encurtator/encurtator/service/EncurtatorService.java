package com.encurtator.encurtator.service;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.encurtator.encurtator.dto.EncurtatorDto;
import com.encurtator.encurtator.dto.EncurtatorReqDto;
import com.encurtator.encurtator.dto.UserDto;
import com.encurtator.encurtator.dto.mapper.EncurtatorMapper;
import com.encurtator.encurtator.dto.mapper.UserMapper;
import com.encurtator.encurtator.exception.RecordNotFoundException;
import com.encurtator.encurtator.model.Encurtator;
import com.encurtator.encurtator.model.Session;
import com.encurtator.encurtator.model.User;
import com.encurtator.encurtator.repository.EncurtatorRepository;
import com.encurtator.encurtator.repository.SessionRepository;
import com.encurtator.encurtator.repository.UserRepository;
import com.encurtator.encurtator.utils.HashUtils;

import jakarta.validation.constraints.NotNull;

@Service
@Validated
public class EncurtatorService {
    private final EncurtatorRepository encurtatorRepository;
    private final UserRepository userRepository;
    private final EncurtatorMapper encurtatorMapper;
    private final UserMapper userMapper;
    private final SessionRepository sessionRepository;
    public EncurtatorService(EncurtatorRepository encurtatorRepository, UserRepository userRepository, 
           EncurtatorMapper encurtatorMapper, UserMapper userMapper, SessionRepository sessionRepository){
        this.encurtatorMapper = encurtatorMapper;
        this.encurtatorRepository = encurtatorRepository;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.sessionRepository = sessionRepository;
    }

    public List<EncurtatorDto> list(UUID id){
        Session session = sessionRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id));
        List<EncurtatorDto> teste = encurtatorRepository.findByUserId(session.getUserId()).stream().map(encurtator -> {
            try {
                return encurtatorMapper.toDto(encurtator);
            } catch (Exception e) {
                e.printStackTrace();
                return null; 
            }
        }).collect(Collectors.toList());
        System.out.println(teste);
        return encurtatorRepository.findByUserId(session.getUserId()).stream().map(encurtator -> {
            try {
                return encurtatorMapper.toDto(encurtator);
            } catch (Exception e) {
                e.printStackTrace();
                return null; 
            }
        }).collect(Collectors.toList());
    }

    public EncurtatorDto findByID(UUID id){
        return encurtatorRepository.findById(id).map(encurtator -> {
            try {
               return encurtatorMapper.toDto(encurtator); 
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }).orElseThrow(() -> new RecordNotFoundException(id));
    }
    
    public EncurtatorDto create(EncurtatorReqDto encurtatorReqDto) throws Exception{
        Encurtator enc = new Encurtator();
        Session sessionFinder = sessionRepository.findById(encurtatorReqDto.sessionId()).orElseThrow(() -> new RecordNotFoundException(encurtatorReqDto.sessionId()));
        User user = userRepository.findById(sessionFinder.getUserId()).orElseThrow(() -> new RecordNotFoundException(sessionFinder.getUserId()));
        enc.setEncryptedUrl(HashUtils.encryptUrl(encurtatorReqDto.longUrl(), HashUtils.decodePublicKey(user.getPublicKey())));
        enc.setShortUrl(convertUrl(enc.getEncryptedUrl()));
        enc.setCreatedAt(new Date());
        enc.setUserId(sessionFinder.getUserId());
        encurtatorRepository.save(enc);
        return encurtatorMapper.toDto(enc);
        
    }

     public String convertUrl(String hashedUrl) {
    StringBuilder url = new StringBuilder();
    for (int i = 0; i < 8; i++) {
        int num = (int) Math.floor(Math.random() * hashedUrl.length());
        url.append(hashedUrl.charAt(num));
    }
    return url.toString();
}

    public static KeyPair genKeys() throws Exception{
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        KeyPair pair = generator.generateKeyPair();
        return pair;
    }

    public ResponseEntity<?> delete(@NotNull UUID id){
        try{
            encurtatorRepository.deleteById(id);
            return ResponseEntity.ok("{\"success\":\"Encurtator Deleted Successfully\"}"); 
        }catch(Exception err){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"Encurtator not found\"}");
        }
        
    }
    
    public UserDto createUser(UserDto userDto) throws Exception{
        User u = new User();
        KeyPair keypair = genKeys();
        u.setEmail(userDto.email());
        u.setPassword(HashUtils.getSha(userDto.password()));
        u.setPrivateKey(keypair.getPrivate().getEncoded());
        u.setPublicKey(keypair.getPublic().getEncoded());
        userRepository.save(u);
    
        return userMapper.toDto(u);
    }
    
}
