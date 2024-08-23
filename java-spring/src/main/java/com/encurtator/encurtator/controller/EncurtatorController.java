package com.encurtator.encurtator.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.encurtator.encurtator.dto.EncurtatorDto;
import com.encurtator.encurtator.dto.EncurtatorReqDto;
import com.encurtator.encurtator.dto.UserDto;
import com.encurtator.encurtator.service.EncurtatorService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
@Validated
@RequestMapping("/api")
public class EncurtatorController {    
    private final EncurtatorService encurtatorService;

    public EncurtatorController(EncurtatorService encurtatorService){
        this.encurtatorService = encurtatorService;
    }

    @GetMapping("/encurtator")
    public List<EncurtatorDto> list(){
        return encurtatorService.list();
    }

    @GetMapping("/encurtator/{id}")
    public EncurtatorDto findByID(@PathVariable UUID id){
        return encurtatorService.findByID(id);
    }

    @PostMapping("/encurtator")
    @ResponseStatus(code = HttpStatus.CREATED)
    public EncurtatorDto create(@RequestBody @Valid @NotNull EncurtatorReqDto encurtatorReqDto) throws Exception{
        System.out.println(encurtatorReqDto);
        return encurtatorService.create(encurtatorReqDto);
    }

    @DeleteMapping("/encurtator/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull UUID id){
        encurtatorService.delete(id);
    }

    @PostMapping("/createUser")
    public UserDto createUser(@RequestBody UserDto userDto)throws Exception{
        return encurtatorService.createUser(userDto);
    }

    // @PostMapping("/login/user")
    //     public UserDto login(@RequestBody UserDto userDto) throws Exception{
    //         System.out.println(userDto.email());
    //         return encurtatorService.login(userDto);
    //     }
    
}
