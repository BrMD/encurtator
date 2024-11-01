package com.encurtator.encurtator.dto.mapper;

import org.springframework.stereotype.Component;

import com.encurtator.encurtator.dto.UserDto;
import com.encurtator.encurtator.model.User;
import com.encurtator.encurtator.utils.Utils;

@Component
public class UserMapper {

    public UserDto toDto(User user){
        if(user == null) return null;
        return new UserDto(user.getId(), user.getEmail(), Utils.toHexString(user.getPassword()));
    }

    public User toEntity(UserDto userDto) throws Exception{
        if(userDto == null)return null;
        User user = new User();
        if(userDto.id() != null)user.setId(userDto.id());
        user.setEmail(userDto.email());
        user.setPassword(Utils.getSha(userDto.password()));
        return user;
    }
}
