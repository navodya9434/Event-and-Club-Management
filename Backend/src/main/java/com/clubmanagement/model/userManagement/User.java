package com.clubmanagement.model.userManagement;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false)
private String email;

@Column(unique = true, nullable = false)
private String username; 

@Column(nullable = false)
private String password;
    // ... other fields (firstName, lastName, etc.)

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<UserRole> userRoles = new ArrayList<>();

    // Important: Add this getter
    public List<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    // Helper method (optional but useful)
    public void addRole(Role role) {
        UserRole userRole = new UserRole(this, role);
        this.userRoles.add(userRole);
    }

    public String getUsername() {
    return username;
}
public String getEmail() {
    return email;
}

public Long getUserId() {
    return userId;
}

public String getPassword() {
    return password;
}
    // ... ctructors, getters & setters for other fields
}