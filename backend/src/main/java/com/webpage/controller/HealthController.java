package com.webpage.controller;

import com.webpage.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

/**
 * 健康检查控制器
 * 用于检测服务是否正常运行
 */
@RestController
public class HealthController {

    @GetMapping("/api/health")
    public ApiResponse<Map<String, String>> health() {
        return ApiResponse.success(Collections.singletonMap("status", "ok"));
    }
}
