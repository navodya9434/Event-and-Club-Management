package com.clubmanagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import com.clubmanagement.repository.userManagement.UserRepository;
import com.clubmanagement.model.userManagement.User;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class TestLogin implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String username = "alice";          // username in DB
        String rawPassword = "alice123";    // the password you want to test

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            System.out.println("User not found");
            return;
        }

        boolean matches = passwordEncoder.matches(rawPassword, user.getPassword());
        System.out.println("Password matches? " + matches);

        if (matches) {
            System.out.println("Login successful for user: " + user.getUsername());
        } else {
            System.out.println("Invalid password for user: " + user.getUsername());
        }
    }
}