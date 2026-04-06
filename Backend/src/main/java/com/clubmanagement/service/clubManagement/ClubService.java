package com.clubmanagement.service.clubManagement;

import com.clubmanagement.dto.clubManagement.ClubRequestDTO;
import com.clubmanagement.model.clubManagement.Club;
import com.clubmanagement.model.clubManagement.ClubStatus;
import com.clubmanagement.repository.clubManagement.ClubMemberRepository;
import com.clubmanagement.repository.clubManagement.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ClubService {

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
private ClubMemberRepository clubMemberRepository;

    

    private final String UPLOAD_DIR = "uploads/permission-letters/";
    private final String IMAGE_UPLOAD_DIR = "uploads/images/"; // 


    public Club createClub(ClubRequestDTO dto) {
        Club club = new Club();
        club.setName(dto.getName());
        club.setCategory(dto.getCategory());
        club.setDescription(dto.getDescription());
        club.setPresident(dto.getPresident());
        club.setPresidentId(dto.getPresidentId());
        club.setEmail(dto.getEmail());
        club.setContact(dto.getContact());
    club.setOrganizerId(dto.getOrganizerId());

        // Save uploaded PDF
        if (dto.getPermissionLetter() != null && !dto.getPermissionLetter().isEmpty()) {
            try {
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                String fileName = System.currentTimeMillis() + "_" + dto.getPermissionLetter().getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(dto.getPermissionLetter().getInputStream(), filePath);

                club.setPermissionLetterPath(filePath.toString());
            } catch (IOException e) {
                throw new RuntimeException("Failed to store file: " + e.getMessage());
            }
        }


        // ✅ SAVE IMAGE (THIS FIXES YOUR ERROR)
        if (dto.getImage() != null && !dto.getImage().isEmpty()) {
            try {
                Path uploadPath = Paths.get(IMAGE_UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                String fileName = System.currentTimeMillis() + "_" + dto.getImage().getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(dto.getImage().getInputStream(), filePath);

                club.setImagePath(filePath.toString()); 
            } catch (IOException e) {
                throw new RuntimeException("Failed to store image: " + e.getMessage());
            }
        } else {
            throw new RuntimeException("Image is required"); // matches DB NOT NULL
        }

        return clubRepository.save(club);
    }

    public List<Club> getClubsByOrganizerId(String organizerId) {
    return clubRepository.findByOrganizerId(organizerId);
}

public List<Club> getAcceptedClubs() {
        List<Club> clubs = clubRepository.findByStatus(ClubStatus.ACCEPTED);
        for (Club club : clubs) {
            int memberCount = clubMemberRepository.countByClub_Id(club.getId());
            club.setMemberCount(memberCount);
        }
        return clubs;
    }

}