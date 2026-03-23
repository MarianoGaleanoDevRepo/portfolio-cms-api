package com.portfolio.api.controller;

import com.portfolio.api.dto.user.UserCreateRequest;
import com.portfolio.api.dto.user.UserResponse;
import com.portfolio.api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public UserResponse create(@Valid @RequestBody UserCreateRequest request) {
        return service.create(request);
    }

    @GetMapping
    public List<UserResponse> getAll() {
        return service.getAll();
    }
}