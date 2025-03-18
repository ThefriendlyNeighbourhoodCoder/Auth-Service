package com.certihub.auth.service;

import com.certihub.auth.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.oidc.web.logout.OidcClientInitiatedLogoutSuccessHandler;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final ClientRegistrationRepository clientRegistrationRepository;
    private final OAuthSuccessHandler oAuthSuccessHandler; //Custom OAuth Success Handler

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          ClientRegistrationRepository clientRegistrationRepository,
                          OAuthSuccessHandler oAuthSuccessHandler) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.clientRegistrationRepository = clientRegistrationRepository;
        this.oAuthSuccessHandler = oAuthSuccessHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) //Fix CORS
                .csrf(AbstractHttpConfigurer::disable) //No need for CSRF with JWT
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() //Fix CORS Preflight issue
                        .requestMatchers("/auth/**", "/oauth2/**", "/login/oauth2/**").permitAll() //Allow public endpoints
                        .requestMatchers("/user/data").authenticated() //Protect API
                        .anyRequest().permitAll()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // ✅ JWT-based
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oAuthSuccessHandler) //Use custom success handler for redirect
                )
                .logout(logout -> logout
                        .logoutSuccessHandler(oidcLogoutSuccessHandler()) //OIDC Logout Handling
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); //Keep JWT Filter

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // ✅ Allow frontend
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public OidcClientInitiatedLogoutSuccessHandler oidcLogoutSuccessHandler() {
        return new OidcClientInitiatedLogoutSuccessHandler(clientRegistrationRepository);
    }
}
