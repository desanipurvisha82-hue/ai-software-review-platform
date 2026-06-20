package com.novexa.review_platform.repository;

import com.novexa.review_platform.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findBySoftwareId(Long softwareId);
}