package com.clubmanagement.advertisement.controller;

import com.clubmanagement.advertisement.model.Advertisement;
import com.clubmanagement.advertisement.service.AdvertisementService;
import com.clubmanagement.advertisement.service.ImageStorageService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AdvertisementController {

    private final AdvertisementService advertisementService;
    private final ImageStorageService imageStorageService;

    public AdvertisementController(AdvertisementService advertisementService, ImageStorageService imageStorageService) {
        this.advertisementService = advertisementService;
        this.imageStorageService = imageStorageService;
    }

    @PostMapping(value = "/manager/advertisements/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> uploadAdvertisementImage(@RequestParam("file") MultipartFile file) {
        String imageUrl = imageStorageService.storeImage(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("imageUrl", imageUrl));
    }

    @PostMapping("/manager/advertisements")
    public ResponseEntity<Advertisement> createAdvertisement(@Valid @RequestBody Advertisement advertisement) {
        Advertisement createdAdvertisement = advertisementService.createAdvertisement(advertisement);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAdvertisement);
    }

    @GetMapping("/manager/advertisements")
    public ResponseEntity<List<Advertisement>> getAllAdvertisements() {
        return ResponseEntity.ok(advertisementService.getAllAdvertisements());
    }

    @GetMapping("/manager/advertisements/expired")
    public ResponseEntity<List<Advertisement>> getExpiredAdvertisements() {
        return ResponseEntity.ok(advertisementService.getExpiredAdvertisements());
    }

    @GetMapping("/manager/advertisements/active")
    public ResponseEntity<List<Advertisement>> getManagerActiveAdvertisements() {
        return ResponseEntity.ok(advertisementService.getActiveAdvertisements());
    }

    @GetMapping("/manager/advertisements/{id}")
    public ResponseEntity<Advertisement> getAdvertisementById(@PathVariable Long id) {
        return ResponseEntity.ok(advertisementService.getAdvertisementById(id));
    }

    @PutMapping("/manager/advertisements/{id}")
    public ResponseEntity<Advertisement> updateAdvertisement(
            @PathVariable Long id,
            @Valid @RequestBody Advertisement advertisement
    ) {
        return ResponseEntity.ok(advertisementService.updateAdvertisement(id, advertisement));
    }

    @DeleteMapping("/manager/advertisements/{id}")
    public ResponseEntity<Void> deleteAdvertisement(@PathVariable Long id) {
        advertisementService.deleteAdvertisement(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/advertisements")
    public ResponseEntity<List<Advertisement>> getStudentVisibleAdvertisements() {
        return ResponseEntity.ok(advertisementService.getStudentVisibleAdvertisements());
    }

    @GetMapping("/student/advertisements/{id}")
    public ResponseEntity<Advertisement> getStudentAdvertisementById(@PathVariable Long id) {
        return ResponseEntity.ok(advertisementService.getStudentAdvertisementById(id));
    }
}

