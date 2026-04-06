package com.clubmanagement.repository.clubManagement;

import com.clubmanagement.model.clubManagement.ClubStaff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClubStaffRepository extends JpaRepository<ClubStaff, Long> {
    List<ClubStaff> findByClubId(Long clubId);
}