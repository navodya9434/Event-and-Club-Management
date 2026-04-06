package com.clubmanagement.model.clubManagement;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "meetings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="club_id", nullable=false)
    private Long clubId;

    @Column(nullable=false)
    private String title;

    @Column(name="date_time", nullable=false)
    private LocalDateTime dateTime;

    @Column(nullable=false)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private Audience audience = Audience.BOTH;

    @Column(name="created_at", nullable=false, updatable=false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Audience {
        STAFF,
        MEMBERS,
        BOTH
    }
}