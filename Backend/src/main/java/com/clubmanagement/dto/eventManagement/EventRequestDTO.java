package com.clubmanagement.dto.eventManagement;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class EventRequestDTO {

    private String title;
    private String category;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private String description;
    private String organizerName;
    private int capacity;

    private MultipartFile permissionDocument;

    private MultipartFile image;

    private Long eventOrgId;
}