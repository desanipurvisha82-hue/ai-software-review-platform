package com.novexa.review_platform.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novexa.review_platform.dto.ReviewRequest;
import com.novexa.review_platform.entity.Review;
import com.novexa.review_platform.service.ReviewService;

import lombok.RequiredArgsConstructor;

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

    @GetMapping("/user/{userId}")
    public List<Review> getReviewsByUser(@PathVariable Long userId) {
        return reviewService.getReviewsByUser(userId);
    }

    @GetMapping("/software/{softwareId}/average-rating")
    public Map<String, Object> getAverageRating(@PathVariable Long softwareId) {
        return Map.of(
                "softwareId", softwareId,
                "averageRating", reviewService.getAverageRating(softwareId)
        );
 
    }

    @PutMapping("/{id}")
public Review updateReview(@PathVariable Long id, @RequestBody ReviewRequest request) {
    return reviewService.updateReview(id, request);
}

@DeleteMapping("/{id}")
public String deleteReview(@PathVariable Long id) {
    return reviewService.deleteReview(id);
}
}