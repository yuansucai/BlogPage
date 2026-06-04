package com.webpage.controller;

import com.webpage.common.ApiResponse;
import com.webpage.model.Profile;
import com.webpage.service.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 个人资料控制器
 */
@RestController
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/api/profile")
    public ApiResponse<Profile> getProfile() {
        return ApiResponse.success(profileService.getProfile());
    }
}
