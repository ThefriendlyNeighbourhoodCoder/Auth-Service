package com.certihub.auth.service;

import com.certihub.auth.model.Role;
import com.certihub.auth.model.User;
import com.certihub.auth.repository.UserRepository;
import com.certihub.auth.security.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {
    private static final Logger logger = LoggerFactory.getLogger(OAuthSuccessHandler.class);
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public OAuthSuccessHandler(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String fullName = oAuth2User.getAttribute("name");

        logger.info("🔄 Google OAuth Success! Checking user in database: {}", email);

        Optional<User> existingUser = userRepository.findByEmail(email);
        User user;

        if (existingUser.isEmpty()) {
            // ✅ New user: Register automatically
            logger.warn("⚠️ Google User Not Found in Database! Creating new user...");

            user = User.builder()
                    .email(email)
                    .fullName(fullName)
                    .password(null)  // ✅ Google users don't have a password
                    .role(Role.USER) // ✅ Default role is USER
                    .build();

            userRepository.save(user);
        } else {
            // ✅ Existing user: Use stored data
            user = existingUser.get();
        }

        logger.info("✅ OAuth User Authenticated: {}", user.getEmail());
        logger.info("✅ User Role: {}", user.getRole());

        // ✅ Generate JWT
        String jwtToken = jwtUtil.generateToken(user);
        logger.info("✅ Generated JWT Token: {}", jwtToken);

        // ✅ Redirect to Frontend with Token
        String frontendRedirectUrl = "http://localhost:5173/oauth-success?token=" + jwtToken;
        response.sendRedirect(frontendRedirectUrl);
    }
}
