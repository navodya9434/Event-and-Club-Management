package com.clubmanagement.advertisement.service;

import com.clubmanagement.advertisement.exception.ResourceNotFoundException;
import com.clubmanagement.advertisement.model.Advertisement;
import com.clubmanagement.advertisement.model.AdvertisementStatus;
import com.clubmanagement.advertisement.repository.AdvertisementRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AdvertisementServiceImpl implements AdvertisementService {

    private static final List<AdvertisementStatus> STUDENT_EXCLUDED_STATUSES = List.of(
            AdvertisementStatus.INAPPROPRIATE,
            AdvertisementStatus.EXPIRED
    );

    private final AdvertisementRepository advertisementRepository;

    public AdvertisementServiceImpl(AdvertisementRepository advertisementRepository) {
        this.advertisementRepository = advertisementRepository;
    }

    @Override
    public Advertisement createAdvertisement(Advertisement advertisement) {
        return advertisementRepository.save(advertisement);
    }

    @Override
    public Advertisement updateAdvertisement(Long id, Advertisement advertisement) {
        Advertisement existingAdvertisement = getAdvertisementById(id);
        existingAdvertisement.setTitle(advertisement.getTitle());
        existingAdvertisement.setDescription(advertisement.getDescription());
        existingAdvertisement.setImageUrl(advertisement.getImageUrl());
        existingAdvertisement.setExpiryDate(advertisement.getExpiryDate());
        existingAdvertisement.setStatus(advertisement.getStatus());
        return advertisementRepository.save(existingAdvertisement);
    }

    @Override
    public void deleteAdvertisement(Long id) {
        if (!advertisementRepository.existsById(id)) {
            throw new ResourceNotFoundException("Advertisement not found with id: " + id);
        }
        advertisementRepository.deleteById(id);
    }

    @Override
    public List<Advertisement> getAllAdvertisements() {
        return advertisementRepository.findAll();
    }

    @Override
    public Advertisement getAdvertisementById(Long id) {
        return advertisementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Advertisement not found with id: " + id));
    }

    @Override
    public List<Advertisement> getStudentVisibleAdvertisements() {
        return advertisementRepository.findStudentVisibleAdvertisements(LocalDate.now(), STUDENT_EXCLUDED_STATUSES);
    }

    @Override
    public Advertisement getStudentAdvertisementById(Long id) {
        Advertisement advertisement = getAdvertisementById(id);
        LocalDate today = LocalDate.now();
        if (advertisement.getStatus() == AdvertisementStatus.INAPPROPRIATE
                || advertisement.getStatus() == AdvertisementStatus.EXPIRED
                || advertisement.getExpiryDate().isBefore(today)) {
            throw new ResourceNotFoundException(
                    "Advertisement not found or no longer available with id: " + id);
        }
        return advertisement;
    }

    @Override
    public List<Advertisement> getExpiredAdvertisements() {
        return advertisementRepository.findExpiredAdvertisements(LocalDate.now());
    }

    @Override
    public List<Advertisement> getActiveAdvertisements() {
        return advertisementRepository.findActiveAdvertisements(LocalDate.now());
    }
}

