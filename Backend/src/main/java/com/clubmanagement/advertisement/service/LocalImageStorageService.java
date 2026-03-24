package com.clubmanagement.advertisement.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
public class LocalImageStorageService implements ImageStorageService {

    private static final long MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
    private static final Set<String> ALLOWED_EXTENSIONS = Set.of("jpg", "jpeg", "png", "webp", "gif");

    private final Path uploadRoot;

    public LocalImageStorageService(@Value("${app.upload-dir:uploads}") String uploadDir) {
        this.uploadRoot = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    @Override
    public String storeImage(MultipartFile file) {
        validateFile(file);

        try {
            Files.createDirectories(uploadRoot);

            String extension = extractExtension(file.getOriginalFilename());
            String generatedName = UUID.randomUUID() + "." + extension;
            Path destination = uploadRoot.resolve(generatedName).normalize();

            if (!destination.startsWith(uploadRoot)) {
                throw new IllegalArgumentException("Invalid file path");
            }

            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + generatedName;
        } catch (IOException ex) {
            throw new IllegalArgumentException("Failed to store image file", ex);
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Image file is required");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new IllegalArgumentException("Image file must be 5MB or less");
        }

        String extension = extractExtension(file.getOriginalFilename());
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Only jpg, jpeg, png, webp, and gif files are allowed");
        }
    }

    private String extractExtension(String filename) {
        String cleanedName = StringUtils.cleanPath(filename == null ? "" : filename);
        int lastDot = cleanedName.lastIndexOf('.');

        if (lastDot < 0 || lastDot == cleanedName.length() - 1) {
            throw new IllegalArgumentException("File extension is required");
        }

        return cleanedName.substring(lastDot + 1).toLowerCase();
    }
}

