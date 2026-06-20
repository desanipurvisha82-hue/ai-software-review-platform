package com.novexa.review_platform.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {

    private Long userId;
    private Long softwareId;
    private Integer rating;
    private String title;
    private String comment;
}