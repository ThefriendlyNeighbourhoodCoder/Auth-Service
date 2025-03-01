package com.certihub.auth.security;

import com.certihub.auth.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = Base64.getEncoder().encodeToString(
            Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded()
    );

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("id", user.getId())
                .claim("fullName", user.getFullName())
                .claim("phone", user.getPhone())
                .claim("role", user.getRole().name()) // ✅ Store role inside JWT
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10-hour expiry
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class)); // ✅ Extract role correctly
    }

    public boolean validateToken(String token, String email) {
        return email.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET_KEY));
    }
}
