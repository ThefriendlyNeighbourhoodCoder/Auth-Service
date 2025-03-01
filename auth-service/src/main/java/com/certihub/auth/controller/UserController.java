package com.certihub.auth.controller;

import com.certihub.auth.model.User;
import com.certihub.auth.repository.UserRepository;
import com.certihub.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @GetMapping("/data")
    public ResponseEntity<?> getUserData(@RequestHeader("Authorization") String token) {
        // ✅ Extract token without "Bearer " prefix
        String extractedToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtUtil.extractUsername(extractedToken);

        // ✅ Fetch user from DB
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user);
    }
}
