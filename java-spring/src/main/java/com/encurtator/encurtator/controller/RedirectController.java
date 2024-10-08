package com.encurtator.encurtator.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.encurtator.encurtator.service.RedirectService;

@RestController
@Validated
@RequestMapping("/redirect")
public class RedirectController {
    private final RedirectService redirectService;
    public RedirectController(RedirectService redirectService){
        this.redirectService = redirectService;
    }
    @GetMapping("/{shortUrl}")
    public ResponseEntity<?> redirect(@PathVariable String shortUrl) throws Exception{
        return redirectService.findByshortUrl(shortUrl);
    }

}
