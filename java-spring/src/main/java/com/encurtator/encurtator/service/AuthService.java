package com.encurtator.encurtator.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import com.encurtator.encurtator.dto.UserDto;
import com.encurtator.encurtator.model.Session;
import com.encurtator.encurtator.model.User;
import com.encurtator.encurtator.repository.SessionRepository;
import com.encurtator.encurtator.repository.UserRepository;
import com.encurtator.encurtator.utils.HashUtils;

@Service
@Validated
public class AuthService {
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    
    public AuthService(UserRepository userRepository, SessionRepository sessionRepository){
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }
    
    public ResponseEntity<?> login(@RequestBody UserDto userDto) throws Exception {
    // Check if the user exists
    User user = userRepository.findByEmail(userDto.email());
    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"User not found\"}");
    }
    String p1 = HashUtils.toHexString(user.getPassword());
    String p2 = HashUtils.toHexString(HashUtils.getSha(userDto.password()));
    if (p1.equals(p2)) {
        Session session = new Session();
        session.setUserId(user.getId());
        sessionRepository.save(session);
        return ResponseEntity.ok("{\"sessionId\": \"" + session.getSessionId().toString() + "\"}");
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Invalid password\"}");
}
}
