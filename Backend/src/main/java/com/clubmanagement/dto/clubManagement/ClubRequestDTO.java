package com.clubmanagement.dto.clubManagement;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ClubRequestDTO {
    private String name;
    private String category;
    private String description;
    private String president;
    private String presidentId;
    private String email;
    private String contact;
    private MultipartFile permissionLetter;
    private MultipartFile image;
    private String organizerId;


}