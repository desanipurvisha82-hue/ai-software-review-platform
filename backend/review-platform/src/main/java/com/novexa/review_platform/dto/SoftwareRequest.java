package com.novexa.review_platform.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SoftwareRequest {
    private String name;
    private String description;
    private String website;
    private String category;
    private String logoUrl;
}