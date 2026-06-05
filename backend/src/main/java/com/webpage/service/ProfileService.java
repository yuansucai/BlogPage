package com.webpage.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webpage.model.Profile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 个人资料服务
 * 默认资料来自代码，后台保存后写入本地 JSON 文件
 */
@Service
public class ProfileService {

    private final ObjectMapper objectMapper;
    private final Path profileDataFile;
    private Profile profile;

    public ProfileService(
        ObjectMapper objectMapper,
        @Value("${app.profile.data-file:data/profile.json}") String profileDataFile
    ) {
        this.objectMapper = objectMapper;
        this.profileDataFile = Paths.get(profileDataFile).toAbsolutePath().normalize();
    }

    @PostConstruct
    public void init() {
        if (Files.exists(profileDataFile)) {
            try {
                profile = objectMapper.readValue(profileDataFile.toFile(), Profile.class);
                normalizeProfile(profile);
                return;
            } catch (Exception e) {
                // 读取失败时回退到默认资料，避免服务启动失败
            }
        }

        profile = createDefaultProfile();
    }

    private Profile createDefaultProfile() {
        Profile profile = new Profile();
        profile.setName("程序员嘟嘟嘟");
        profile.setAvatar("/avatar.svg");
        profile.setTitle("前端工程师");
        profile.setBio("热爱技术，专注于 Web 全栈开发。擅长 React、Next.js、Node.js 生态，热衷于用代码创造有价值的工具和产品。相信技术改变世界，开源让技术更美好。");
        profile.setAbout(Arrays.asList(
            "8 年前端开发经验，专注于 React、Next.js、TypeScript 技术栈，热衷于用代码创造有价值的工具和产品。",
            "目前专注于 Next.js + TypeScript 技术栈，同时关注 AI 与大模型应用开发。"
        ));

        LinkedHashMap<String, String> social = new LinkedHashMap<>();
        social.put("github", "https://github.com/yuansucai");
        social.put("email", "377044677@qq.com");
        social.put("juejin", "https://juejin.cn/user/3949101498244632");
        profile.setSocial(social);

        profile.setLocation("中国 · 杭州");
        profile.setCompany("某互联网公司");
        return profile;
    }

    /**
     * 获取个人资料
     */
    public synchronized Profile getProfile() {
        return profile;
    }

    /**
     * 更新个人资料
     */
    public synchronized Profile updateProfile(Profile updatedProfile) throws IOException {
        normalizeProfile(updatedProfile);
        Files.createDirectories(profileDataFile.getParent());
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(profileDataFile.toFile(), updatedProfile);
        profile = updatedProfile;
        return profile;
    }

    private void normalizeProfile(Profile target) {
        if (target.getName() == null || target.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("姓名不能为空");
        }
        if (target.getTitle() == null) target.setTitle("");
        if (target.getBio() == null) target.setBio("");
        if (target.getAvatar() == null) target.setAvatar("");
        if (target.getLocation() == null) target.setLocation("");
        if (target.getCompany() == null) target.setCompany("");

        List<String> about = target.getAbout();
        if (about == null) {
            target.setAbout(Arrays.asList("", ""));
        }

        Map<String, String> social = target.getSocial();
        if (social == null) {
            social = new LinkedHashMap<>();
            target.setSocial(social);
        }
        if (!social.containsKey("github")) social.put("github", "");
        if (!social.containsKey("email")) social.put("email", "");
        if (!social.containsKey("juejin")) social.put("juejin", "");
    }
}
