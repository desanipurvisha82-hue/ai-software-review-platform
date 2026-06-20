package com.novexa.review_platform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "softwares")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Software {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String website;
    private String logoUrl;

    @Column(length = 2000)
    private String description;

    private LocalDateTime createdAt;
}