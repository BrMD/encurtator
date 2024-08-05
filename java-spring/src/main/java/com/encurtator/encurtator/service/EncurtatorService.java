package com.encurtator.encurtator.service;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import com.encurtator.encurtator.dto.EncurtatorDto;
import com.encurtator.encurtator.dto.EncurtatorReqDto;
import com.encurtator.encurtator.dto.UserDto;
import com.encurtator.encurtator.dto.mapper.EncurtatorMapper;
import com.encurtator.encurtator.dto.mapper.UserMapper;
import com.encurtator.encurtator.model.Encurtator;
import com.encurtator.encurtator.model.User;
import com.encurtator.encurtator.repository.EncurtatorRepository;
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
    public EncurtatorService(EncurtatorRepository encurtatorRepository, UserRepository userRepository, 
           EncurtatorMapper encurtatorMapper, UserMapper userMapper){
        this.encurtatorMapper = encurtatorMapper;
        this.encurtatorRepository = encurtatorRepository;
        this.userRepository = userRepository;
        this.userMapper = userMapper;

    }

    public List<EncurtatorDto> list(){
        return encurtatorRepository.findAll().stream()
        .map(encurtator -> {
            try {
                return encurtatorMapper.toDto(encurtator);
            } catch (Exception e) {
                e.printStackTrace();
                return null; // ou você pode lançar uma RuntimeException, por exemplo
            }
        })
        .collect(Collectors.toList());
    }

    public EncurtatorDto findByID(UUID id){
        return encurtatorRepository.findById(id).map(encurtator -> {
            try {
               return encurtatorMapper.toDto(encurtator); 
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }).orElseThrow(() -> new RuntimeException("Encurtator não encontrado para o id: " + id));
    }

    public EncurtatorDto create(EncurtatorReqDto encurtatorReqDto) throws Exception{
        Encurtator enc = new Encurtator();
        User user = userRepository.findById(encurtatorReqDto.userId()).orElseThrow();
        enc.setEncryptedUrl(HashUtils.encryptUrl(encurtatorReqDto.normalUrl(), HashUtils.decodePublicKey(user.getPublicKey())));
        enc.setShortUrl(convertUrl(enc.getEncryptedUrl()));
        enc.setCreatedAt(new Date());
        enc.setUserId(encurtatorReqDto.userId());
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

    public void delete(@NotNull UUID id){
        encurtatorRepository.deleteById(id);
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

    public UserDto login(@RequestBody UserDto userDto) throws Exception{
        User user =  userRepository.findByEmail(userDto.email());
        String p1 = HashUtils.toHexString(user.getPassword());
        String p2 = HashUtils.toHexString(HashUtils.getSha(userDto.password()));
        if(p1.equals(p2)) return userMapper.toDto(user);
        return null;
    }
    
}
