package com.portfolio.api.service.impl;

import com.portfolio.api.dto.project.ProjectRequest;
import com.portfolio.api.dto.project.ProjectResponse;
import com.portfolio.api.entity.Project;
import com.portfolio.api.repository.ProjectRepository;
import com.portfolio.api.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository repository;

    public ProjectServiceImpl(ProjectRepository repository) {
        this.repository = repository;
    }

    @Override
    public ProjectResponse create(ProjectRequest request) {
        Project project = new Project();
        project.setTitle(request.title());
        project.setShortDescription(request.shortDescription());
        project.setDescription(request.description());
        project.setGithubUrl(request.githubUrl());
        project.setDemoUrl(request.demoUrl());
        project.setImageUrl(request.imageUrl());
        project.setFeatured(request.featured());
        project.setPublished(request.published());

        Project saved = repository.save(project);
        return map(saved);
    }

    @Override
    public List<ProjectResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public ProjectResponse getById(Long id) {
        Project project = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        return map(project);
    }

    @Override
    public ProjectResponse update(Long id, ProjectRequest request) {
        Project project = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        project.setTitle(request.title());
        project.setShortDescription(request.shortDescription());
        project.setDescription(request.description());
        project.setGithubUrl(request.githubUrl());
        project.setDemoUrl(request.demoUrl());
        project.setImageUrl(request.imageUrl());
        project.setFeatured(request.featured());
        project.setPublished(request.published());

        Project updated = repository.save(project);
        return map(updated);
    }

    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Proyecto no encontrado");
        }

        repository.deleteById(id);
    }

    private ProjectResponse map(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getShortDescription(),
                project.getDescription(),
                project.getGithubUrl(),
                project.getDemoUrl(),
                project.getImageUrl(),
                project.getFeatured(),
                project.getPublished(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}