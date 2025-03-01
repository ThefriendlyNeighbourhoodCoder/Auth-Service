package com.certihub.auth.controller;

import com.certihub.auth.model.User;
import com.certihub.auth.payload.LoginResponse;
import com.certihub.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<LoginResponse> loginUser(@RequestBody User user) {
        // Authenticate user and generate token
        String token = authService.loginUser(user.getEmail(), user.getPassword());

        // Retrieve the full user details to check the role.
        User loggedInUser = authService.getUserByEmail(user.getEmail());

        String role = loggedInUser.getRole().name();

        // Determine the redirect URL based on role
        String redirectUrl = role.equalsIgnoreCase("USER")
                ? "/user_dash"
                : role.equalsIgnoreCase("ADMIN")
                ? "/admin_dash"
                : "/"; // default route if role is unrecognized

        return ResponseEntity.ok(new LoginResponse(token, redirectUrl));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(@RequestHeader("Authorization") String authHeader) {
        // Remove "Bearer " prefix if present
        String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
        authService.logoutUser(token);
        return ResponseEntity.ok("Logged out successfully");
    }
}
