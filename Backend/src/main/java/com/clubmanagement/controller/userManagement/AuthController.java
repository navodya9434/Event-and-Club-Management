package com.clubmanagement.controller.userManagement;

import com.clubmanagement.dto.userManagement.LoginRequest;
import com.clubmanagement.security.JwtUtil;
import com.clubmanagement.service.userManagement.CustomUserDetailsService;
import com.clubmanagement.service.userManagement.CustomUserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final CustomUserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(CustomUserDetailsService userDetailsService,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Load user as CustomUserDetails
            CustomUserDetails user = (CustomUserDetails) userDetailsService
                    .loadUserByUsername(loginRequest.getUsername());

            // Check password
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
            }

            // Generate JWT using username + userId
            String token = jwtUtil.generateToken(user.getUsername(), user.getUserId().toString());

            // Extract roles
            List<String> roles = user.getAuthorities().stream()
                    .map(a -> a.getAuthority())
                    .toList();

            // Return token + username + roles
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "username", user.getUsername(),
                    "roles", roles
            ));

        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "User not found"));
        }
    }

    // DTO for login request
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}