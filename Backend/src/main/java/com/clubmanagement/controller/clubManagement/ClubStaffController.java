package com.clubmanagement.controller.clubManagement;

import com.clubmanagement.model.clubManagement.ClubStaff;
import com.clubmanagement.service.clubManagement.ClubStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:3000")
public class ClubStaffController {

    @Autowired
    private ClubStaffService service;

    // ✅ ADD STAFF
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ClubStaff addStaff(
            @RequestParam Long clubId,
            @RequestParam String fullName,
            @RequestParam Integer age,
            @RequestParam String position,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam(required = false) String officeLocation,
            @RequestParam("image") MultipartFile image
    ) throws Exception {

        ClubStaff staff = new ClubStaff();
        staff.setClubId(clubId);
        staff.setFullName(fullName);
        staff.setAge(age);
        staff.setPosition(position);
        staff.setEmail(email);
        staff.setPhone(phone);
        staff.setOfficeLocation(officeLocation);

        return service.addStaff(
                staff,
                image.getBytes(),
                image.getOriginalFilename()
        );
    }

    // ✅ GET STAFF BY CLUB
    @GetMapping
    public List<ClubStaff> getStaff(@RequestParam Long clubId) {
        return service.getStaffByClub(clubId);
    }
}