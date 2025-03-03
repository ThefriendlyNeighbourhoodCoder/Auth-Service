package com.certihub.auth.service;

import com.certihub.auth.model.User;
import com.certihub.auth.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // ✅ Fix: Ensure password is not null (assigning a dummy password for OAuth users)
        String password = (user.getPassword() != null) ? user.getPassword() : "{noop}oauth_user";

        // ✅ Fix: Convert role to a valid authority format (Spring Security requires "ROLE_USER" or "ROLE_ADMIN")
        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                password, // ✅ Ensures password is never null
                authorities // ✅ Correct role formatting
        );
    }
}
