package com.clubmanagement.service.eventManagement;

import com.clubmanagement.dto.eventManagement.EventRequestDTO;
import com.clubmanagement.model.eventManagement.Event;
import com.clubmanagement.repository.eventManagement.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    private final String UPLOAD_DIR = "uploads/event-permissions/";
    private final String IMAGE_UPLOAD_DIR = "uploads/event-images/";


    public Event createEvent(EventRequestDTO dto) {
        try {
            Event event = new Event();
            event.setTitle(dto.getTitle());
            event.setCategory(dto.getCategory());
            event.setDate(dto.getDate());
            event.setTime(dto.getTime());
            event.setLocation(dto.getLocation());
            event.setDescription(dto.getDescription());
            event.setOrganizerName(dto.getOrganizerName());
            event.setCapacity(dto.getCapacity());
            event.setEventOrgId(dto.getEventOrgId());

            // Handle file upload
            MultipartFile file = dto.getPermissionDocument();
            if (file != null && !file.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path uploadPath = Paths.get(UPLOAD_DIR, fileName);

                // Create directory if not exists
                Files.createDirectories(uploadPath.getParent());

                // Save file
                Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);

                // Save relative path to DB
                event.setPermissionDocumentPath(UPLOAD_DIR + fileName);
            } else {
                throw new RuntimeException("Permission document is required");
            }

            MultipartFile image = dto.getImage();

            if (image != null && !image.isEmpty()) {
                String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path imagePath = Paths.get(IMAGE_UPLOAD_DIR, imageName);

                Files.createDirectories(imagePath.getParent());

                Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

                event.setImagePath(IMAGE_UPLOAD_DIR + imageName); // ✅ SAVE
            }

            // =========================
            return eventRepository.save(event);

        } catch (Exception e) {
            throw new RuntimeException("Error creating event: " + e.getMessage(), e);
        }
    }


    
    public List<Event> getEventsByOrganizer(Long eventOrgId) {
        return eventRepository.findByEventOrgId(eventOrgId);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}