package com.portfolio.api.service.impl;

import com.portfolio.api.dto.auth.LoginRequest;
import com.portfolio.api.dto.auth.LoginResponse;
import com.portfolio.api.entity.User;
import com.portfolio.api.repository.UserRepository;
import com.portfolio.api.security.JwtUtil;
import com.portfolio.api.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository repository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = repository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        boolean passwordOk = passwordEncoder.matches(request.password(), user.getPassword());

        if (!passwordOk) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String token = jwtUtil.generateToken(user);

        return new LoginResponse(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                token,
                "Login correcto"
        );
    }
}