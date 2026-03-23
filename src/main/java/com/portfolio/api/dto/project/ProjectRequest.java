package com.portfolio.api.dto.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProjectRequest(

        @NotBlank(message = "El título es obligatorio")
        @Size(max = 120, message = "El título no puede superar 120 caracteres")
        String title,

        @NotBlank(message = "La descripción corta es obligatoria")
        @Size(max = 255, message = "La descripción corta no puede superar 255 caracteres")
        String shortDescription,

        String description,
        String githubUrl,
        String demoUrl,
        String imageUrl,
        Boolean featured,
        Boolean published
) {
}