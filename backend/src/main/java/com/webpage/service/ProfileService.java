package com.webpage.service;

import com.webpage.model.Profile;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.LinkedHashMap;

/**
 * 个人资料服务
 * 当前使用内存数据，后续可替换为数据库查询
 */
@Service
public class ProfileService {

    private Profile profile;

    @PostConstruct
    public void init() {
        profile = new Profile();
        profile.setName("程序员加贝");
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
    }

    /**
     * 获取个人资料
     */
    public Profile getProfile() {
        return profile;
    }
}
