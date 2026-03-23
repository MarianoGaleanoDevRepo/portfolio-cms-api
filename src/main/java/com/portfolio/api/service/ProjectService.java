package com.portfolio.api.service;

import com.portfolio.api.dto.project.ProjectRequest;
import com.portfolio.api.dto.project.ProjectResponse;

import java.util.List;

public interface ProjectService {
    ProjectResponse create(ProjectRequest request);
    List<ProjectResponse> getAll();
    ProjectResponse getById(Long id);
    ProjectResponse update(Long id, ProjectRequest request);
    void delete(Long id);
}