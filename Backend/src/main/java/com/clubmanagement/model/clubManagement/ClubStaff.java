package com.clubmanagement.model.clubManagement;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "club_staff")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClubStaff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long clubId;

    private String fullName;
    private Integer age;
    private String position;

    @Column(unique = true)
    private String email;

    private String phone;
    private String officeLocation;

    private String profilePhotoPath;

    private String createdAt;
}