package com.webpage.controller;

import com.webpage.common.ApiResponse;
import com.webpage.model.Project;
import com.webpage.service.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 项目控制器
 */
@RestController
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * 获取项目列表
     * @param category 分类筛选（可选），如 "AI应用"、"Web应用" 等
     */
    @GetMapping("/api/projects")
    public ApiResponse<List<Project>> getProjects(
            @RequestParam(required = false) String category) {
        return ApiResponse.success(projectService.getProjects(category));
    }
}
