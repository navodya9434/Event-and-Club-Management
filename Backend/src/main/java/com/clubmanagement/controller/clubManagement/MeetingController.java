package com.clubmanagement.controller.clubManagement;

import com.clubmanagement.model.clubManagement.Meeting;
import com.clubmanagement.service.clubManagement.MeetingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin(origins = "*")
public class MeetingController {

    private final MeetingService service;

    public MeetingController(MeetingService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Meeting createMeeting(@RequestBody Meeting meeting) {
        return service.createMeeting(meeting);
    }

    // Read all for a club
    @GetMapping("/club/{clubId}")
    public List<Meeting> getClubMeetings(@PathVariable Long clubId) {
        return service.getClubMeetings(clubId);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteMeeting(@PathVariable Long id) {
        service.deleteMeeting(id);
    }

    // Update
    @PutMapping("/{id}")
    public Meeting updateMeeting(@PathVariable Long id, @RequestBody Meeting updated) {
        updated.setId(id);
        return service.updateMeeting(updated);
    }
}