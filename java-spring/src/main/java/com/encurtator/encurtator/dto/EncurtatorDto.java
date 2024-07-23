package com.encurtator.encurtator.dto;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EncurtatorDto(
    @Id @JsonProperty("id") UUID id,
    @NotNull @NotBlank @Column(length=15, nullable = false) String ShortUrl,
    @NotNull @NotBlank @Column(length=100, nullable=false) String encryptedUrl,
    @JsonProperty("userId") UUID userId,
    @NotNull Date createAt) {
}
