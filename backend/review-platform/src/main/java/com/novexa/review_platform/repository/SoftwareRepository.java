package com.novexa.review_platform.repository;

import com.novexa.review_platform.entity.Software;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SoftwareRepository extends JpaRepository<Software, Long> {
}