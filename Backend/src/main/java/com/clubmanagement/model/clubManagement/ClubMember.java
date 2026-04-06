package com.clubmanagement.model.clubManagement;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "club_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClubMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;  // matches your DB primary key

    @ManyToOne(fetch = FetchType.LAZY) // Many members belong to one club
    @JoinColumn(name = "club_id", nullable = false)
    private Club club;

    @Column(name = "user_id", nullable = false)
    private Long userId; // Reference to the users table

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column
    private String faculty;

    @Column
    private LocalDate dob;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column
    private String photo;

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;

}