package com.clubmanagement.repository.clubManagement;

import com.clubmanagement.model.clubManagement.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    List<Meeting> findByClubIdOrderByDateTimeAsc(Long clubId);
}