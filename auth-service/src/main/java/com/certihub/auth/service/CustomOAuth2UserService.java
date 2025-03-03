package com.certihub.auth.service;

import com.certihub.auth.model.User;
import com.certihub.auth.model.Role;
import com.certihub.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional  // ✅ Ensure database transaction commits
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String email = oAuth2User.getAttribute("email");

        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            System.out.println("⚠️ Google User Not Found in Database! Creating New User: " + email);

            User newUser = new User();
            newUser.setEmail(email);
            newUser.setFullName(oAuth2User.getAttribute("name"));
            newUser.setRole(Role.USER);  // ✅ Assign default role

            // ✅ Save User to Database BEFORE OAuth Authentication
            newUser = userRepository.save(newUser);
            userRepository.flush();  // ✅ Force Hibernate to Commit

            System.out.println("✅ New Google User Registered: " + newUser.getEmail());
            return createOAuthUser(newUser, oAuth2User);
        } else {
            System.out.println("✅ Existing Google User Found: " + email);
            return createOAuthUser(existingUser.get(), oAuth2User);
        }
    }

    private OAuth2User createOAuthUser(User user, OAuth2User oAuth2User) {
        return new DefaultOAuth2User(
                Collections.singleton(new OAuth2UserAuthority(oAuth2User.getAttributes())),
                oAuth2User.getAttributes(),
                "email"
        );
    }
}
