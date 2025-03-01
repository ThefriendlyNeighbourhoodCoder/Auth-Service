package com.certihub.auth.service;

import com.certihub.auth.model.User;
import com.certihub.auth.model.Role;
import com.certihub.auth.repository.UserRepository;
import com.certihub.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final Set<String> tokenBlacklist = new HashSet<>(); // ✅ Store blacklisted tokens

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER); // ✅ Assign default role
        userRepository.save(user);
        return "User registered successfully!";
    }

    public String loginUser(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return "Invalid credentials";
        }
        return jwtUtil.generateToken(user);
    }

    public User getUserByEmail(String email) { // ✅ FIX: Added this method
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void logoutUser(String token) {
        tokenBlacklist.add(token); // ✅ Add token to blacklist
    }

    public boolean isTokenBlacklisted(String token) {
        return tokenBlacklist.contains(token);
    }
}
