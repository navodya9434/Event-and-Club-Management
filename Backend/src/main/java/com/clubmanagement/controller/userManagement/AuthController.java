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

    String username = loginRequest.getUsername();
    String password = loginRequest.getPassword();

    try {
        // ✅ 1. CHECK ADMIN TABLE
        if (username.equals("admin1") && password.equals("admin123")) {
            String token = jwtUtil.generateToken(username, "ADMIN");

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "username", username,
                    "roles", List.of("ADMIN")
            ));
        }

        // ✅ 2. CHECK AD MANAGER TABLE
        if (username.equals("manager1") && password.equals("manager123")) {
            String token = jwtUtil.generateToken(username, "AD_MANAGER");

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "username", username,
                    "roles", List.of("AD_MANAGER")
            ));
        }

        // ✅ 3. NORMAL USER LOGIN (existing)
        CustomUserDetails user = (CustomUserDetails) userDetailsService
                .loadUserByUsername(username);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getUserId().toString());

        List<String> roles = user.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .toList();

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