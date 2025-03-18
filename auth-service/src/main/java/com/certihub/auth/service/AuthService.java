package com.certihub.auth.service;

import com.certihub.auth.model.User;
import com.certihub.auth.model.Role;
import com.certihub.auth.repository.UserRepository;
import com.certihub.auth.security.JwtUtil;
import com.certihub.auth.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final Set<String> tokenBlacklist = new HashSet<>(); //Store blacklisted tokens

    // Generate a 6-digit OTP
    private String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER); //Assign default role
        userRepository.save(user);
        user.setVerified(false);
        return "User registered successfully!";
    }

    public Map<String, String> loginUser(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        if (!user.isVerified()) {
            // ✅ Reduce OTP generation time by skipping database query
            String otp = generateOtp();
            user.setOtpCode(otp);
            user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
            userRepository.save(user);

            // ✅ Use async thread to send email without blocking response
            CompletableFuture.runAsync(() -> emailService.sendOtpEmail(email, otp));

            return Map.of("message", "OTP sent. Please verify your email.", "redirectUrl", "/verify-otp");
        }

        // ✅ Generate JWT instantly before DB save operation
        String jwtToken = jwtUtil.generateToken(user);

        return Map.of("token", jwtToken, "redirectUrl", "/user_dash");
    }



    public User getUserByEmail(String email) { //FIX: Added this method
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void logoutUser(String token) {
        tokenBlacklist.add(token); //Add token to blacklist
    }

    public boolean isTokenBlacklisted(String token) {
        return tokenBlacklist.contains(token);
    }

    public Map<String, String> verifyOtp(String email, String otp) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getOtpExpiry().isBefore(LocalDateTime.now()) || !user.getOtpCode().equals(otp)) {
            throw new RuntimeException("Invalid or expired OTP!");
        }

        // ✅ Mark as Verified
        user.setVerified(true);
        user.setOtpCode(null);
        user.setOtpExpiry(null);
        userRepository.save(user);

        // ✅ Issue JWT Immediately
        String jwtToken = jwtUtil.generateToken(user);

        return Map.of("message", "Email verified successfully!", "token", jwtToken, "redirectUrl", "/user_dash");
    }

    public String resendOtp(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isVerified()) {
            return "User is already verified.";
        }

        String otp = generateOtp();
        user.setOtpCode(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5)); // OTP valid for 5 minutes
        userRepository.save(user);

        emailService.sendOtpEmail(user.getEmail(), otp);

        return "New OTP sent to your email!";
    }


}
