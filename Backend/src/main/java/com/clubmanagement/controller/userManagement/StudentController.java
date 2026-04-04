package com.clubmanagement.controller.userManagement;

import com.clubmanagement.dto.userManagement.RoleResponse;
import com.clubmanagement.service.userManagement.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")   // Change to your frontend URL later
public class StudentController {

    private final UserService userService;

    public StudentController(UserService userService) {
        this.userService = userService;
    }

    // Get current logged-in user's roles
    @GetMapping("/roles")
    public ResponseEntity<RoleResponse> getCurrentUserRoles(Authentication authentication) {
        String username = authentication.getName(); // JWT or SecurityContext should contain username
        List<String> roles = userService.getUserRolesByUsername(username);
        return ResponseEntity.ok(new RoleResponse(roles));
    }
}