package com.clubmanagement.dto.userManagement;

import java.util.List;

public class RoleResponse {
    private List<String> roles;

    public RoleResponse(List<String> roles) {
        this.roles = roles;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}