package com.clubmanagement.security;

import com.clubmanagement.service.userManagement.CustomUserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthFilter(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        System.out.println("JwtAuthFilter - Request Path: " + path); // 🔍 DEBUG

        // --- 1️⃣ Bypass security for public endpoints ---
        if (isPublicEndpoint(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        // --- 2️⃣ JWT authentication ---
        String authHeader = request.getHeader("Authorization");
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                if (jwtUtil.validateToken(token)) {
                    username = jwtUtil.extractUsername(token);
                }
            } catch (Exception e) {
                System.out.println("Invalid JWT token: " + e.getMessage());
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid JWT token");
                return;
            }
        }

        // --- 3️⃣ Set Authentication in SecurityContext ---
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        // --- 4️⃣ Continue filter chain ---
        filterChain.doFilter(request, response);
    }

    /**
     * Returns true if the path should bypass JWT authentication.
     */
    private boolean isPublicEndpoint(String path) {
        return path.contains("/api/clubs/accepted")  // public: get accepted clubs
                || path.startsWith("/uploads/")      // public: static files
                || path.contains("/login")           // public: login endpoint
                || path.contains("/register");       // public: registration
    }
}