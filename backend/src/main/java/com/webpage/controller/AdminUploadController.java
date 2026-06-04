package com.webpage.controller;

import com.webpage.common.ApiResponse;
import com.webpage.service.ImageStorageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 后台上传控制器
 * 所有 /api/admin/** 的请求都会经过 AuthInterceptor 验证 token
 */
@RestController
@RequestMapping("/api/admin/uploads")
public class AdminUploadController {

    private final ImageStorageService imageStorageService;

    public AdminUploadController(ImageStorageService imageStorageService) {
        this.imageStorageService = imageStorageService;
    }

    /**
     * 上传文章正文配图
     * POST /api/admin/uploads/images
     */
    @PostMapping("/images")
    public ApiResponse<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        String filename = imageStorageService.saveImage(file);
        String url = ServletUriComponentsBuilder
            .fromCurrentContextPath()
            .path("/uploads/images/")
            .path(filename)
            .toUriString();

        Map<String, String> result = new HashMap<>();
        result.put("url", url);
        result.put("filename", filename);
        return ApiResponse.success(result);
    }
}
