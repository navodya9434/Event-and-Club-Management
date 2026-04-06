package com.clubmanagement.repository.eventManagement;

import com.clubmanagement.model.eventManagement.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByEventOrgId(Long eventOrgId);
}