package com.certihub.auth.security;

import com.certihub.auth.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final AuthService authService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService, AuthService authService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            // ✅ Check if token is blacklisted
            if (authService.isTokenBlacklisted(token)) {
                chain.doFilter(request, response);
                return;
            }

            String username = jwtUtil.extractUsername(token);
            String role = jwtUtil.extractRole(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtUtil.validateToken(token, userDetails.getUsername())) {
                    List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));

                    Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        chain.doFilter(request, response);
    }
}
