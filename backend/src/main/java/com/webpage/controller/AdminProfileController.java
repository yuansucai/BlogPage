package com.webpage.controller;

import com.webpage.common.ApiResponse;
import com.webpage.model.Profile;
import com.webpage.service.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * 后台个人资料管理控制器
 */
@RestController
@RequestMapping("/api/admin/profile")
public class AdminProfileController {

    private final ProfileService profileService;

    public AdminProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ApiResponse<Profile> getProfile() {
        return ApiResponse.success(profileService.getProfile());
    }

    @PutMapping
    public ApiResponse<Profile> updateProfile(@RequestBody Profile profile) throws IOException {
        return ApiResponse.success(profileService.updateProfile(profile));
    }
}
