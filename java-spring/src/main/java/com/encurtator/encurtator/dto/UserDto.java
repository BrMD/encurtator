package com.encurtator.encurtator.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserDto(
    @JsonProperty("id") UUID id,
    @NotBlank @Email String email,
    @NotNull @NotBlank String password,
    String privateKey,
    String publicKey
) {
    
}
