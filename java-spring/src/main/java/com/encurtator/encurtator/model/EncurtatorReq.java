package com.encurtator.encurtator.model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;

public class EncurtatorReq {
    @NotNull
    @Column(length=40, nullable=false)
    private String userId;

    @NotNull
    @Column(length=100, nullable=false)
    private String normalUrl;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getNormalUrl() {
        return normalUrl;
    }

    public void setNormalUrl(String normalUrl) {
        this.normalUrl = normalUrl;
    }

    
}
