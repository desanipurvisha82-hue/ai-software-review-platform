package com.novexa.review_platform.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.novexa.review_platform.dto.DashboardResponse;
import com.novexa.review_platform.entity.Review;
import com.novexa.review_platform.repository.ReviewRepository;
import com.novexa.review_platform.repository.SoftwareRepository;
import com.novexa.review_platform.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final SoftwareRepository softwareRepository;
    private final ReviewRepository reviewRepository;

    public DashboardResponse getStats() {

        long totalUsers = userRepository.count();
        long totalSoftware = softwareRepository.count();
        long totalReviews = reviewRepository.count();

        List<Review> reviews = reviewRepository.findAll();

        double averageRating = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        return new DashboardResponse(
                totalUsers,
                totalSoftware,
                totalReviews,
                averageRating
        );
    }
}