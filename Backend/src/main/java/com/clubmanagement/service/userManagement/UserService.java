package com.clubmanagement.service.userManagement;

import com.clubmanagement.model.userManagement.User;
import com.clubmanagement.repository.userManagement.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Get all role names for a user by email
     * This is used by StudentController to show relevant dashboard buttons
     */
    public List<String> getUserRolesByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        // Assuming you have a getRoles() or getUserRoles() method in User entity
        return user.getUserRoles().stream()
                .map(userRole -> userRole.getRole().getRoleName())
                .toList();
    }

    // Other existing methods...
}