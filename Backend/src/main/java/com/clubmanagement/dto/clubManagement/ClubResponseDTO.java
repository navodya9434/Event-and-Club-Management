package com.clubmanagement.dto.clubManagement;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClubResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String president;
    private String contact;
    private String imagePath;
    private int memberCount;
    private String status;
}