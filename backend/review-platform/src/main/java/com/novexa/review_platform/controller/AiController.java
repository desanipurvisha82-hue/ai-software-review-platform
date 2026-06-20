package com.novexa.review_platform.controller;

import com.novexa.review_platform.dto.AiSummaryResponse;
import com.novexa.review_platform.service.AiSummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AiController {

    private final AiSummaryService aiSummaryService;

    @GetMapping("/summary/{softwareId}")
    public AiSummaryResponse getSummary(@PathVariable Long softwareId) {
        return aiSummaryService.generateSummary(softwareId);
    }
}