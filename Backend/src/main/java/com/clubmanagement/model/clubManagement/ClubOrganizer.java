package com.clubmanagement.model.clubManagement;

import jakarta.persistence.*;
import com.clubmanagement.util.StatusConverter;

@Entity
@Table(name = "club_organizers")
public class ClubOrganizer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "club_org_id")  // <-- map to actual DB column
    private Long id;

    private Long userId;

    // ✅ Use converter instead of @Enumerated
    @Convert(converter = StatusConverter.class)
    private Status status;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    // Enum stays uppercase (best practice)
    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }
}