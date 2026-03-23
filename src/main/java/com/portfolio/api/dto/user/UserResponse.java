package com.portfolio.api.dto.user;


import com.portfolio.api.entity.Role;

public record UserResponse(
        Long id,
        String email,
        Role role
){}