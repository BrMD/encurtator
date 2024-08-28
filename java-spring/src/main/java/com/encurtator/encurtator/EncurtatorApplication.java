package com.encurtator.encurtator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class EncurtatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(EncurtatorApplication.class, args);
	}

}
