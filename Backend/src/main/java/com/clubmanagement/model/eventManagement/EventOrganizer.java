package com.clubmanagement.model.eventManagement;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "event_organizers")
public class EventOrganizer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_org_id")
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    private String nic;

    @Column(name = "permission_document")
    private String permissionDocument;

    @Column(name = "approved_by")
    private Long approvedBy;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        pending,
        approved,
        rejected
    }

    // Getters & Setters
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}