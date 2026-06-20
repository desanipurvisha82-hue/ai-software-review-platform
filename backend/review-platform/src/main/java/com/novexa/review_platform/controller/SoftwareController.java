package com.novexa.review_platform.controller;

import com.novexa.review_platform.dto.SoftwareRequest;
import com.novexa.review_platform.entity.Software;
import com.novexa.review_platform.service.SoftwareService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/software")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SoftwareController {

    private final SoftwareService softwareService;

    @PostMapping
    public Software createSoftware(@RequestBody SoftwareRequest request) {
        return softwareService.createSoftware(request);
    }

    @GetMapping
    public List<Software> getAllSoftware() {
        return softwareService.getAllSoftware();
    }

    @GetMapping("/{id}")
    public Software getSoftwareById(@PathVariable Long id) {
        return softwareService.getSoftwareById(id);
    }

    @PutMapping("/{id}")
    public Software updateSoftware(@PathVariable Long id, @RequestBody SoftwareRequest request) {
        return softwareService.updateSoftware(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteSoftware(@PathVariable Long id) {
        return softwareService.deleteSoftware(id);
    }
}