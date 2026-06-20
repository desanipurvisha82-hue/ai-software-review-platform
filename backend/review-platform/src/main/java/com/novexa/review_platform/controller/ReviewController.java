package com.novexa.review_platform.controller;

import com.novexa.review_platform.dto.ReviewRequest;
import com.novexa.review_platform.entity.Review;
import com.novexa.review_platform.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public Review addReview(@RequestBody ReviewRequest request) {
        return reviewService.addReview(request);
    }

    @GetMapping("/software/{softwareId}")
    public List<Review> getReviewsBySoftware(@PathVariable Long softwareId) {
        return reviewService.getReviewsBySoftware(softwareId);
    }

    @GetMapping("/software/{softwareId}/average-rating")
    public Map<String, Object> getAverageRating(@PathVariable Long softwareId) {

        return Map.of(
                "softwareId", softwareId,
                "averageRating", reviewService.getAverageRating(softwareId)
        );
    }
}