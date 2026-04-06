package com.clubmanagement.repository.eventManagement;

import com.clubmanagement.model.eventManagement.EventOrganizer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventOrganizerRepository extends JpaRepository<EventOrganizer, Long> {

    Optional<EventOrganizer> findByUserId(Long userId);
}