package com.novexa.review_platform.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth

                        // Public basic APIs
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/test",
                                "/",
                                "/uploads/**"
                        ).permitAll()

                        // File upload
                        .requestMatchers(HttpMethod.POST, "/api/files/upload").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/files/**").permitAll()

                        // Public GET APIs
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/software",
                                "/api/software/**",
                                "/api/reviews/software/**",
                                "/api/reviews/user/**",
                                "/api/ai/**"
                        ).permitAll()

                        // Admin software APIs
                        .requestMatchers(HttpMethod.POST, "/api/software").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/software/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/software/**").hasRole("ADMIN")

                        // Review APIs
                        .requestMatchers(HttpMethod.POST, "/api/reviews").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/reviews/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/reviews/**").hasAnyRole("USER", "ADMIN")

                        // Admin dashboard
                        .requestMatchers("/api/dashboard/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }
}