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
import org.springframework.stereotype.Component;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;


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
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // Identify provider from authentication token
        final String provider = authToken.getAuthorizedClientRegistrationId(); // "google", "linkedin", "github"

        // Declare email and fullName as final
        final String email;
        final String fullName;

        if (provider.equals("google") && oAuth2User instanceof OidcUser) {
            OidcUser oidcUser = (OidcUser) oAuth2User;
            email = oidcUser.getEmail(); // Google provides email directly
            fullName = oidcUser.getFullName();
        } else {
            email = oAuth2User.getAttribute("email");
            fullName = oAuth2User.getAttribute("name");
        }

        if (email == null || fullName == null) {
            throw new RuntimeException("⚠️ Missing email or name from OAuth provider: " + provider);
        }

        Optional<User> existingUser = userRepository.findByEmail(email);

        // ✅ Fix: Use effectively final email and fullName inside lambda
        User user = existingUser.orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setFullName(fullName);
            newUser.setRole(Role.USER);
            return userRepository.save(newUser);
        });

        // ✅ Generate JWT after verifying correct provider flow
        String token = jwtUtil.generateToken(user);
        response.sendRedirect("http://localhost:5173/oauth-success?token=" + token);
    }


}
