package com.portfolio.api.security;

import com.portfolio.api.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "mi_clave_super_secreta_para_jwt_2026_portfolio"; // It is the secret key used to sign the token
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hours times long life to token

    public String generateToken(User user) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("role", user.getRole().name())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }


    public String extractEmail(String token) {
    SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
}

public boolean isTokenValid(String token) {
    try {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

        Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);

        return true;
    } catch (Exception e) {
        return false;
    }
    
    }

public String extractRole(String token) {
    SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .get("role", String.class);
}
}