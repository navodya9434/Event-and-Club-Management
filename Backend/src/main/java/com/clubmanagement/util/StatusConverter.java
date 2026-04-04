package com.clubmanagement.util;

import com.clubmanagement.model.clubManagement.ClubOrganizer;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter<ClubOrganizer.Status, String> {

    @Override
    public String convertToDatabaseColumn(ClubOrganizer.Status status) {
        return status == null ? null : status.name().toLowerCase();
    }

    @Override
    public ClubOrganizer.Status convertToEntityAttribute(String dbData) {
        return dbData == null ? null : ClubOrganizer.Status.valueOf(dbData.toUpperCase());
    }
}