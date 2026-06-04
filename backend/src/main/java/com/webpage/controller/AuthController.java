package com.webpage.controller;

import com.webpage.common.ApiResponse;
import com.webpage.model.User;
import com.webpage.repository.UserRepository;
import com.webpage.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 认证控制器
 * 处理登录、token 验证等认证相关请求
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    /**
     * 登录接口
     * POST /api/auth/login
     * 请求体：{ "username": "admin", "password": "admin123" }
     * 返回：{ "code": 200, "data": { "token": "xxx", "username": "admin" } }
     */
    @PostMapping("/login")
    public ApiResponse<Map<String, String>> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        if (username == null || password == null) {
            return ApiResponse.error(400, "用户名和密码不能为空");
        }

        // 1. 根据用户名查数据库
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return ApiResponse.error(401, "用户名或密码错误");
        }

        // 2. 验证密码（BCrypt 加密比对，不是明文比较）
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ApiResponse.error(401, "用户名或密码错误");
        }

        // 3. 生成 JWT Token
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        // 4. 返回 token 和用户信息
        Map<String, String> data = new HashMap<>();
        data.put("token", token);
        data.put("username", user.getUsername());
        data.put("role", user.getRole());
        return ApiResponse.success(data);
    }

    /**
     * 验证 token 接口
     * GET /api/auth/me
     * 请求头：Authorization: Bearer <token>
     * 返回当前登录用户信息
     */
    @GetMapping("/me")
    public ApiResponse<Map<String, String>> me(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.error(401, "未登录");
        }

        try {
            String token = authHeader.substring(7); // 去掉 "Bearer " 前缀
            String username = jwtUtil.getUsername(token);
            User user = userRepository.findByUsername(username);

            if (user == null) {
                return ApiResponse.error(401, "用户不存在");
            }

            Map<String, String> data = new HashMap<>();
            data.put("username", user.getUsername());
            data.put("role", user.getRole());
            return ApiResponse.success(data);
        } catch (Exception e) {
            return ApiResponse.error(401, "Token 无效或已过期");
        }
    }

    /**
     * 修改密码接口
     * POST /api/auth/change-password
     * 请求头：Authorization: Bearer <token>
     * 请求体：{ "oldPassword": "admin123", "newPassword": "newPass@123" }
     *
     * 流程：
     * 1. 从 token 中获取当前用户名
     * 2. 验证旧密码是否正确
     * 3. 用 BCrypt 加密新密码后更新数据库
     */
    @PostMapping("/change-password")
    public ApiResponse<String> changePassword(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody Map<String, String> request) {

        // 1. 验证 token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.error(401, "未登录");
        }

        String username;
        try {
            String token = authHeader.substring(7);
            username = jwtUtil.getUsername(token);
        } catch (Exception e) {
            return ApiResponse.error(401, "Token 无效或已过期");
        }

        // 2. 获取参数
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");

        if (oldPassword == null || newPassword == null) {
            return ApiResponse.error(400, "旧密码和新密码不能为空");
        }

        if (newPassword.length() < 6) {
            return ApiResponse.error(400, "新密码长度不能少于 6 位");
        }

        // 3. 查找用户并验证旧密码
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return ApiResponse.error(404, "用户不存在");
        }

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return ApiResponse.error(400, "旧密码不正确");
        }

        // 4. 加密新密码并更新数据库
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ApiResponse.success("密码修改成功");
    }
}
