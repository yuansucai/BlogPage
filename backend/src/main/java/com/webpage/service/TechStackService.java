package com.webpage.service;

import com.webpage.model.TechItem;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;

/**
 * 技术栈服务
 * 当前使用内存数据，后续可替换为数据库查询
 */
@Service
public class TechStackService {

    private List<TechItem> techItems;

    @PostConstruct
    public void init() {
        techItems = Arrays.asList(
            createTechItem("React", "⚛️", "Frontend", "构建用户界面的核心框架"),
            createTechItem("Next.js", "▲", "Frontend", "全栈 React 框架，SSR/SSG 支持"),
            createTechItem("TypeScript", "📘", "Language", "类型安全的 JavaScript 超集"),
            createTechItem("Tailwind CSS", "🎨", "Styling", "原子化 CSS 框架"),
            createTechItem("Node.js", "🟢", "Backend", "服务端 JavaScript 运行时"),
            createTechItem("Git", "📦", "Tools", "版本控制系统")
        );
    }

    /**
     * 获取所有技术栈
     */
    public List<TechItem> getTechStack() {
        return techItems;
    }

    private TechItem createTechItem(String name, String icon, String category, String description) {
        TechItem item = new TechItem();
        item.setName(name);
        item.setIcon(icon);
        item.setCategory(category);
        item.setDescription(description);
        return item;
    }
}
