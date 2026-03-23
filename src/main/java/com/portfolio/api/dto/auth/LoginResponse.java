package com.portfolio.api.dto.auth;

import com.portfolio.api.entity.Role;

public record LoginResponse(
        Long id,
        String email,
        Role role,
        String message
) {
}