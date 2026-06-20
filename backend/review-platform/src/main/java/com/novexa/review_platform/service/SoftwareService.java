package com.novexa.review_platform.service;

import com.novexa.review_platform.dto.SoftwareRequest;
import com.novexa.review_platform.entity.Software;
import com.novexa.review_platform.repository.SoftwareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SoftwareService {

    private final SoftwareRepository softwareRepository;

    public Software createSoftware(SoftwareRequest request) {
        Software software = Software.builder()
                .name(request.getName())
                .description(request.getDescription())
                .website(request.getWebsite())
                .category(request.getCategory())
                .logoUrl(request.getLogoUrl())
                .createdAt(LocalDateTime.now())
                .build();

        return softwareRepository.save(software);
    }

    public List<Software> getAllSoftware() {
        return softwareRepository.findAll();
    }

    public Software getSoftwareById(Long id) {
        return softwareRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Software not found"));
    }

    public Software updateSoftware(Long id, SoftwareRequest request) {
        Software software = getSoftwareById(id);

        software.setName(request.getName());
        software.setDescription(request.getDescription());
        software.setWebsite(request.getWebsite());
        software.setCategory(request.getCategory());
        software.setLogoUrl(request.getLogoUrl());

        return softwareRepository.save(software);
    }

    public String deleteSoftware(Long id) {
        Software software = getSoftwareById(id);
        softwareRepository.delete(software);
        return "Software deleted successfully";
    }
}