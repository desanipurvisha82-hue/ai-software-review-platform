package com.novexa.review_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DashboardResponse {
    private long totalUsers;
    private long totalSoftware;
    private long totalReviews;
    private double averageRating;
}