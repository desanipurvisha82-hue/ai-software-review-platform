package com.novexa.review_platform.service;

import com.novexa.review_platform.dto.ReviewRequest;
import com.novexa.review_platform.entity.Review;
import com.novexa.review_platform.entity.Software;
import com.novexa.review_platform.entity.User;
import com.novexa.review_platform.repository.ReviewRepository;
import com.novexa.review_platform.repository.SoftwareRepository;
import com.novexa.review_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final SoftwareRepository softwareRepository;

    public Review addReview(ReviewRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Software software = softwareRepository.findById(request.getSoftwareId())
                .orElseThrow(() -> new RuntimeException("Software not found"));

        Review review = Review.builder()
                .rating(request.getRating())
                .title(request.getTitle())
                .comment(request.getComment())
                .createdAt(LocalDateTime.now())
                .user(user)
                .software(software)
                .build();

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsBySoftware(Long softwareId) {
        return reviewRepository.findBySoftwareId(softwareId);
    }

    public Double getAverageRating(Long softwareId) {

        List<Review> reviews = reviewRepository.findBySoftwareId(softwareId);

        if (reviews.isEmpty()) {
            return 0.0;
        }

        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }
}