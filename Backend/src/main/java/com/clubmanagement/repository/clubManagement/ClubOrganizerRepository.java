package com.clubmanagement.repository.clubManagement;

import com.clubmanagement.model.clubManagement.ClubOrganizer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ClubOrganizerRepository extends JpaRepository<ClubOrganizer, Long> {
    Optional<ClubOrganizer> findByUserId(Long userId);
}