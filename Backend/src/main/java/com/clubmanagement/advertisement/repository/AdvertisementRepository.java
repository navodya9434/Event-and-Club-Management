package com.clubmanagement.advertisement.repository;

import com.clubmanagement.advertisement.model.Advertisement;
import com.clubmanagement.advertisement.model.AdvertisementStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {

    @Query("SELECT a FROM Advertisement a WHERE a.expiryDate >= :today AND a.status NOT IN :excludedStatuses")
    List<Advertisement> findStudentVisibleAdvertisements(
            @Param("today") LocalDate today,
            @Param("excludedStatuses") Collection<AdvertisementStatus> excludedStatuses
    );

    @Query("SELECT a FROM Advertisement a WHERE a.status = com.clubmanagement.advertisement.model.AdvertisementStatus.EXPIRED OR a.expiryDate < :today ORDER BY a.expiryDate DESC")
    List<Advertisement> findExpiredAdvertisements(@Param("today") LocalDate today);

    @Query("SELECT a FROM Advertisement a WHERE a.expiryDate >= :today AND a.status = com.clubmanagement.advertisement.model.AdvertisementStatus.ACTIVE ORDER BY a.expiryDate ASC")
    List<Advertisement> findActiveAdvertisements(@Param("today") LocalDate today);
}

