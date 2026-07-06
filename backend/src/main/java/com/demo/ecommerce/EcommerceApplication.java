package com.demo.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URI;

@SpringBootApplication
public class EcommerceApplication {

	public static void main(String[] args) {
		// Render/Heroku-style DATABASE_URL is "postgresql://user:pass@host:port/db",
		// but JDBC needs "jdbc:postgresql://host:port/db" with credentials separate.
		String databaseUrl = System.getenv("DATABASE_URL");
		if (databaseUrl != null && !databaseUrl.startsWith("jdbc:")) {
			URI uri = URI.create(databaseUrl);
			String userInfo = uri.getUserInfo();
			if (userInfo != null) {
				String[] parts = userInfo.split(":", 2);
				System.setProperty("spring.datasource.username", parts[0]);
				System.setProperty("spring.datasource.password", parts.length > 1 ? parts[1] : "");
			}
			int port = uri.getPort() == -1 ? 5432 : uri.getPort();
			System.setProperty("spring.datasource.url",
					"jdbc:postgresql://" + uri.getHost() + ":" + port + uri.getPath());
		}
		SpringApplication.run(EcommerceApplication.class, args);
	}

}
