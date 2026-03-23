package com.portfolio.api.service;

import com.portfolio.api.dto.auth.LoginRequest;
import com.portfolio.api.dto.auth.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}