package com.clubmanagement.service.clubManagement;

import com.clubmanagement.model.clubManagement.ClubStaff;
import com.clubmanagement.repository.clubManagement.ClubStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class ClubStaffService {

    @Autowired
    private ClubStaffRepository repository;

    private final String IMAGE_UPLOAD_DIR = "uploads/staff/";

    public ClubStaff addStaff(ClubStaff staff, byte[] imageBytes, String fileName) {

        try {
            Path uploadPath = Paths.get(IMAGE_UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String newFileName = System.currentTimeMillis() + "_" + fileName;
            Path filePath = uploadPath.resolve(newFileName);
            Files.write(filePath, imageBytes);

            staff.setProfilePhotoPath(filePath.toString());

        } catch (IOException e) {
            throw new RuntimeException("Image upload failed");
        }

        return repository.save(staff);
    }

    public List<ClubStaff> getStaffByClub(Long clubId) {
        return repository.findByClubId(clubId);
    }
}