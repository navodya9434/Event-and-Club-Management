package com.clubmanagement.repository.clubManagement;

import com.clubmanagement.model.clubManagement.ClubMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubMemberRepository extends JpaRepository<ClubMember, Long> {
    int countByClub_Id(Long clubId);
        boolean existsByClub_IdAndUserId(Long clubId, Long userId);


    // ✅ NEW: fetch members by club
    List<ClubMember> findByClub_Id(Long clubId);
}