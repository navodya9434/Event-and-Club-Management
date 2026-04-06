package com.clubmanagement.controller.clubManagement;

import com.clubmanagement.dto.clubManagement.ClubRequestDTO;
import com.clubmanagement.model.clubManagement.Club;
import com.clubmanagement.model.clubManagement.ClubMember;
import com.clubmanagement.model.clubManagement.ClubOrganizer;
import com.clubmanagement.model.clubManagement.ClubStatus;
import com.clubmanagement.repository.clubManagement.ClubMemberRepository;
import com.clubmanagement.repository.clubManagement.ClubOrganizerRepository;
import com.clubmanagement.repository.clubManagement.ClubRepository;
import com.clubmanagement.security.JwtUtil;
import com.clubmanagement.service.clubManagement.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clubs")
@CrossOrigin(origins = "http://localhost:3000")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ClubOrganizerRepository clubOrganizerRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private ClubMemberRepository clubMemberRepository;

    // Create a new club
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createClub(
            @RequestHeader("Authorization") String tokenHeader,
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam String description,
            @RequestParam String president,
            @RequestParam String presidentId,
            @RequestParam String email,
            @RequestParam String contact,
            @RequestParam("permissionLetter") MultipartFile permissionLetter,
            @RequestParam("image") MultipartFile image
    ) {
        try {
            String token = tokenHeader.replace("Bearer ", "");
            String organizerIdStr = jwtUtil.extractUserId(token);
            Long organizerId = Long.parseLong(organizerIdStr);

            ClubOrganizer organizer = clubOrganizerRepository.findByUserId(organizerId)
                    .orElseThrow(() -> new RuntimeException("User is not a club organizer"));

            if (organizer.getStatus() != ClubOrganizer.Status.APPROVED) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Forbidden! You don't have permission to create a club.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            ClubRequestDTO dto = new ClubRequestDTO();
            dto.setName(name);
            dto.setCategory(category);
            dto.setDescription(description);
            dto.setPresident(president);
            dto.setPresidentId(presidentId);
            dto.setEmail(email);
            dto.setContact(contact);
            dto.setPermissionLetter(permissionLetter);
            dto.setImage(image);
            dto.setOrganizerId(organizerIdStr);

            Club savedClub = clubService.createClub(dto);
            return ResponseEntity.ok(savedClub);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error creating club: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Get all clubs of the logged-in organizer
    @GetMapping
    public ResponseEntity<?> getMyClubs(@RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.replace("Bearer ", "");
            String organizerId = jwtUtil.extractUserId(token);

            List<Club> myClubs = clubService.getClubsByOrganizerId(organizerId);
            return ResponseEntity.ok(myClubs);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error fetching clubs: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Get members of a club along with the club name
@GetMapping("/members")
public ResponseEntity<?> getClubMembers(@RequestParam Long clubId) {
    try {
        List<ClubMember> members = clubMemberRepository.findByClub_Id(clubId);
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Club not found"));

        // Map members to include memberId and clubName
        List<Map<String, Object>> memberList = members.stream().map(m -> {
            Map<String, Object> map = new HashMap<>();
            map.put("memberId", m.getMemberId()); // ✅ Correct getter
            map.put("firstName", m.getFirstName());
            map.put("lastName", m.getLastName());
            map.put("faculty", m.getFaculty());
            map.put("email", m.getEmail());
            map.put("mobileNumber", m.getMobileNumber());
            map.put("dob", m.getDob());
            map.put("joinedAt", m.getJoinedAt());
            map.put("photo", m.getPhoto());
            map.put("clubName", club.getName());
            return map;
        }).toList();

        return ResponseEntity.ok(memberList);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
    }
}


    
    // Get all ACCEPTED clubs
    @GetMapping("/accepted")
    public ResponseEntity<List<Club>> getAcceptedClubs() {
        List<Club> acceptedClubs = clubRepository.findByStatus(ClubStatus.ACCEPTED);
        return ResponseEntity.ok(acceptedClubs);
    }

    // ✅ NEW: Get details of a single club with members and faculty distribution
    @GetMapping("/{clubId}")
    public ResponseEntity<?> getClubDetails(@PathVariable Long clubId) {
        try {
            Club club = clubRepository.findById(clubId)
                    .orElseThrow(() -> new RuntimeException("Club not found"));

            int totalMembers = clubMemberRepository.countByClub_Id(club.getId());
            club.setMemberCount(totalMembers);

            List<ClubMember> members = clubMemberRepository.findByClub_Id(club.getId());

            Map<String, Integer> facultyDistribution = new HashMap<>();
            for (ClubMember member : members) {
                String faculty = member.getFaculty() != null ? member.getFaculty() : "Other";
                facultyDistribution.put(faculty, facultyDistribution.getOrDefault(faculty, 0) + 1);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("club", club);
            response.put("totalMembers", totalMembers);
            response.put("facultyDistribution", facultyDistribution);
            response.put("members", members);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}