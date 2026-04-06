package com.clubmanagement.controller.eventManagement;

import com.clubmanagement.dto.eventManagement.EventRequestDTO;
import com.clubmanagement.model.eventManagement.Event;
import com.clubmanagement.model.eventManagement.EventOrganizer;
import com.clubmanagement.repository.eventManagement.EventOrganizerRepository;
import com.clubmanagement.security.JwtUtil;
import com.clubmanagement.service.eventManagement.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private EventOrganizerRepository eventOrganizerRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // Create Event
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createEvent(
            @RequestHeader("Authorization") String tokenHeader,
            @RequestParam String title,
            @RequestParam String category,
            @RequestParam String date,
            @RequestParam String time,
            @RequestParam String location,
            @RequestParam String description,
            @RequestParam String organizerName,
            @RequestParam int capacity,
            
            @RequestParam("permissionDocument") MultipartFile permissionDocument,
            @RequestParam("image") MultipartFile image
    ) {
        try {
            String token = tokenHeader.replace("Bearer ", "");
            Long userId = Long.parseLong(jwtUtil.extractUserId(token));

            // Find organizer
            EventOrganizer organizer = eventOrganizerRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("User is not an event organizer"));

            // Check approval
            if (organizer.getStatus() != EventOrganizer.Status.approved) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "You are not approved to create events"));
            }

            // Build DTO
            EventRequestDTO dto = new EventRequestDTO();
            dto.setTitle(title);
            dto.setCategory(category);
            dto.setDate(java.time.LocalDate.parse(date));
            dto.setTime(java.time.LocalTime.parse(time));
            dto.setLocation(location);
            dto.setDescription(description);
            dto.setOrganizerName(organizerName);
            dto.setCapacity(capacity);
            dto.setPermissionDocument(permissionDocument);
            dto.setImage(image);
            dto.setEventOrgId(organizer.getId());

            Event savedEvent = eventService.createEvent(dto);

            return ResponseEntity.ok(Map.of(
                    "message", "Event created successfully",
                    "event", savedEvent
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get My Events
    @GetMapping
    public ResponseEntity<?> getMyEvents(@RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.replace("Bearer ", "");
            Long userId = Long.parseLong(jwtUtil.extractUserId(token));

            EventOrganizer organizer = eventOrganizerRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("Organizer not found"));

            List<Event> events = eventService.getEventsByOrganizer(organizer.getId());
            return ResponseEntity.ok(events);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}