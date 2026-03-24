package com.clubmanagement.advertisement.service;

import com.clubmanagement.advertisement.model.Advertisement;

import java.util.List;

public interface AdvertisementService {
    Advertisement createAdvertisement(Advertisement advertisement);

    Advertisement updateAdvertisement(Long id, Advertisement advertisement);

    void deleteAdvertisement(Long id);

    List<Advertisement> getAllAdvertisements();

    Advertisement getAdvertisementById(Long id);

    List<Advertisement> getStudentVisibleAdvertisements();
}

