package com.clubmanagement.model.eventManagement;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long id;

    @Column(nullable = false)
@Enumerated(EnumType.STRING) // store as 'FRESH', 'APPROVED', 'REJECTED'
private EventStatus status = EventStatus.FRESH;

    @Column(nullable = false)
    private String title;

    @Column(name = "permission_document_path", nullable = false)
private String permissionDocumentPath;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(name = "organizer_name", nullable = false)
    private String organizerName;

    @Column(nullable = false)
    private int capacity;

    
    @Column(name = "event_org_id", nullable = false)
    private Long eventOrgId;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "image_path")
private String imagePath;
}