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

	// @Bean
	// CommandLineRunner initDatabase(EncurtatorRepository encurtatorRepository){
	// 	return args -> {
	// 		encurtatorRepository.deleteAll();
	// 		Encurtator e = new Encurtator();
	// 		e.setShortUrl("short.ly/abc123");
	// 		e.setEncryptedUrl("https://www.example.com/some/very/long/url/that/needs/to/be/shortened");
	// 		e.setCreatedAt(new Date());
	// 		e.setUserId("251c5166-1578-4cc6-8984-751f3a81ea9d");
	// 		encurtatorRepository.save(e);

	// 	};
	// }
}
