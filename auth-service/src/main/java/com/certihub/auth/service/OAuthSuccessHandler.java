package com.certihub.auth.service;

import com.certihub.auth.model.Role;
import com.certihub.auth.model.User;
import com.certihub.auth.repository.UserRepository;
import com.certihub.auth.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Autowired
    public OAuthSuccessHandler(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        System.out.println("🟢 OAuth Success Handler triggered");

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = oauthToken.getPrincipal();

        String email = (String) oAuth2User.getAttribute("email");
        String fullName = (String) oAuth2User.getAttribute("name");

        System.out.println("🟢 Extracted Email: " + email);
        System.out.println("🟢 Extracted Full Name: " + fullName);

        if (email == null || email.isEmpty()) {
            email = oAuth2User.getAttribute("login") + "@github.com";
        }

        // ✅ Ensure user is stored in DB
        String finalEmail = email;
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(finalEmail);
            newUser.setFullName(fullName);
            newUser.setRole(Role.valueOf("USER")); // Default Role
            System.out.println("🟢 Creating New User in DB: " + finalEmail);
            return userRepository.save(newUser);
        });

        // ✅ Generate JWT Token
        String jwtToken = jwtUtil.generateToken(user);
        System.out.println("🔑 Generated JWT: " + jwtToken);

        // ✅ Build the frontend redirection URL
        String redirectUrl = UriComponentsBuilder.fromHttpUrl("http://localhost:5173/auth-success")
                .queryParam("token", jwtToken)
                .queryParam("role", user.getRole())
                .build().toUriString();

        System.out.println("🔄 Redirecting to: " + redirectUrl);

        response.sendRedirect(redirectUrl);
    }
}
