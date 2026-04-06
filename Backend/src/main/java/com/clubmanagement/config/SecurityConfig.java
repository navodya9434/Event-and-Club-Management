package com.clubmanagement.config;

import com.clubmanagement.security.JwtAuthFilter;
import com.clubmanagement.service.userManagement.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(CustomUserDetailsService userDetailsService, JwtAuthFilter jwtAuthFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder())
                .and()
                .build();
    }

    @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf().disable()
        .cors()
        .and()
        .authorizeHttpRequests(auth -> auth
    // ✅ PUBLIC FIRST
    .requestMatchers("/api/clubs/accepted/**").permitAll()
            .requestMatchers("/uploads/**").permitAll()
            .requestMatchers("/api/login/**").permitAll()
            .requestMatchers("/api/register/**").permitAll()

            // --- SPECIFIC CLUB ENDPOINTS ---
.requestMatchers("/api/clubs/members").permitAll()            .requestMatchers("/api/student/**").hasRole("STUDENT")
            
            // --- ALL OTHER CLUB ENDPOINTS ---
            .requestMatchers("/api/clubs/**").authenticated()
            .requestMatchers("/api/staff/**").authenticated()
            .requestMatchers("/api/meetings/**").authenticated()
            

    .anyRequest().authenticated()
)
        .formLogin().disable()
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}
    

    // Optional: Explicit CORS config for Spring Security (matches CorsConfig)
    @Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOriginPatterns(List.of("http://localhost:3000")); // <-- MUST use allowedOriginPatterns
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true); // needed for JWT/cookies
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}}