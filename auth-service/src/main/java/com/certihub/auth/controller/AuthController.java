package com.certihub.auth.controller;

import com.certihub.auth.model.User;
import com.certihub.auth.payload.LoginResponse;
import com.certihub.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(authService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user) {
        Map<String, String> response = authService.loginUser(user.getEmail(), user.getPassword());

        // 🔍 DEBUG LOG
        System.out.println("🔍 Response from loginUser(): " + response);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(@RequestHeader("Authorization") String authHeader) {
        // Remove "Bearer " prefix if present
        String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
        authService.logoutUser(token);
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        return ResponseEntity.ok(authService.verifyOtp(email, otp));
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(@RequestParam String email) {
        return ResponseEntity.ok(authService.resendOtp(email));
    }

}
