package com.novexa.review_platform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.novexa.review_platform.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findBySoftwareId(Long softwareId);

    List<Review> findByUserId(Long userId);
}