package com.clubmanagement.repository.clubManagement;

import com.clubmanagement.model.clubManagement.Club;
import com.clubmanagement.model.clubManagement.ClubStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {
    List<Club> findByOrganizerId(String organizerId);


    List<Club> findByStatus(ClubStatus  status);
        boolean existsByIdAndOrganizerId(Long clubId, String organizerId);

    
}