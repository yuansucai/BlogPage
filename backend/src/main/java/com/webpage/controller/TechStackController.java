package com.webpage.controller;

import com.webpage.common.ApiResponse;
import com.webpage.model.TechItem;
import com.webpage.service.TechStackService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 技术栈控制器
 */
@RestController
public class TechStackController {

    private final TechStackService techStackService;

    public TechStackController(TechStackService techStackService) {
        this.techStackService = techStackService;
    }

    @GetMapping("/api/techstack")
    public ApiResponse<List<TechItem>> getTechStack() {
        return ApiResponse.success(techStackService.getTechStack());
    }
}
