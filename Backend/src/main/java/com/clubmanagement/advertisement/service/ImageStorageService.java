package com.clubmanagement.advertisement.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageStorageService {

    String storeImage(MultipartFile file);
}

