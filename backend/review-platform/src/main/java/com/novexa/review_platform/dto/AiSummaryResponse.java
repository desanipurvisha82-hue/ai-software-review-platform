package com.novexa.review_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AiSummaryResponse {
    private Long softwareId;
    private String summary;
}