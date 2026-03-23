package com.portfolio.api.dto.project;

import java.time.LocalDateTime;

public record ProjectResponse(
        Long id,
        String title,
        String shortDescription,
        String description,
        String githubUrl,
        String demoUrl,
        String imageUrl,
        Boolean featured,
        Boolean published,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}