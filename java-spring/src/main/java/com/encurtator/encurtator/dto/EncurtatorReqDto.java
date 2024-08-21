package com.encurtator.encurtator.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EncurtatorReqDto(
    @JsonProperty("sessionId") UUID sessionId,
    @NotNull @NotBlank @Column(length=100, nullable=false) String normalUrl) {
    
}
