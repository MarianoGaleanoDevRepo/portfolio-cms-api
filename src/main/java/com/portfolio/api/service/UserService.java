package com.portfolio.api.service;

import com.portfolio.api.dto.user.UserCreateRequest;
import com.portfolio.api.dto.user.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse create(UserCreateRequest request);
    List<UserResponse> getAll();
}