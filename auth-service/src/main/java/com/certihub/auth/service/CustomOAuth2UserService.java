package com.certihub.auth.service;

import com.certihub.auth.model.User;
import com.certihub.auth.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Autowired
    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        if (email == null || email.isEmpty()) {
            throw new RuntimeException("⚠️ Email not provided by OAuth provider.");
        }

        Optional<User> existingUser = userRepository.findByEmail(email);
        existingUser.ifPresent(user -> System.out.println("✅ User exists in DB: " + user.getEmail()));

        return oAuth2User;
    }
}
