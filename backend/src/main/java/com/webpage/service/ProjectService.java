package com.webpage.service;

import com.webpage.model.Project;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 项目服务
 * 当前使用内存数据，后续可替换为数据库查询
 */
@Service
public class ProjectService {

    private List<Project> projects;

    @PostConstruct
    public void init() {
        projects = Arrays.asList(
            createProject("1", "AI Chat Pro",
                "基于大模型的智能对话应用，支持多轮对话、文件解析、代码高亮，采用流式响应实现打字机效果。",
                "/projects/ai-chat.svg",
                Arrays.asList("Next.js", "TypeScript", "OpenAI", "Tailwind CSS"),
                "AI 应用", "https://github.com/jiabei/ai-chat-pro", "https://chat.jiabei.dev", true),

            createProject("2", "DevFlow 工作流引擎",
                "可视化工作流编排平台，支持拖拽式构建 CI/CD 流水线，内置 50+ 常用节点模板。",
                "/projects/devflow.svg",
                Arrays.asList("React", "Node.js", "PostgreSQL", "Docker"),
                "Web 应用", "https://github.com/jiabei/devflow", "https://devflow.jiabei.dev", true),

            createProject("3", "Markdown Magic",
                "所见即所得的 Markdown 编辑器，支持实时预览、数学公式、流程图、代码运行等功能。",
                "/projects/md-magic.svg",
                Arrays.asList("React", "TypeScript", "CodeMirror", "KaTeX"),
                "开源工具", "https://github.com/jiabei/markdown-magic", null, true),

            createProject("4", "Color Palette Generator",
                "智能配色方案生成工具，基于色彩理论自动生成和谐配色，支持导出多种格式。",
                "/projects/color-gen.svg",
                Arrays.asList("Next.js", "Canvas API", "色彩理论"),
                "开源工具", "https://github.com/jiabei/color-palette", "https://colors.jiabei.dev", false),

            createProject("5", "TaskBoard 项目管理",
                "轻量级看板式项目管理工具，支持拖拽排序、标签分类、团队协作，数据本地优先存储。",
                "/projects/taskboard.svg",
                Arrays.asList("React", "DnD Kit", "IndexedDB", "PWA"),
                "Web 应用", "https://github.com/jiabei/taskboard", null, false),

            createProject("6", "Code Snippet Manager",
                "代码片段管理工具，支持语法高亮、标签分类、快速搜索，一键复制常用代码片段。",
                "/projects/snippet.svg",
                Arrays.asList("Electron", "React", "SQLite", "Prism.js"),
                "桌面应用", "https://github.com/jiabei/snippet-manager", null, false),

            createProject("7", "AI Image Generator",
                "AI 图片生成工具，支持文字生成图片、图片风格迁移、背景移除等 AI 图像处理功能。",
                "/projects/ai-image.svg",
                Arrays.asList("Next.js", "Stable Diffusion", "Python", "FastAPI"),
                "AI 应用", "https://github.com/jiabei/ai-image", "https://img.jiabei.dev", true),

            createProject("8", "Fitness Tracker",
                "健身记录 App，支持运动数据追踪、训练计划制定、身体数据分析，采用 React Native 跨平台开发。",
                "/projects/fitness.svg",
                Arrays.asList("React Native", "Expo", "Firebase", "Charts"),
                "移动端", "https://github.com/jiabei/fitness-tracker", null, false)
        );
    }

    /**
     * 获取所有项目，支持按分类筛选
     */
    public List<Project> getProjects(String category) {
        if (category == null || category.isEmpty() || "全部".equals(category)) {
            return projects;
        }
        return projects.stream()
            .filter(p -> category.equals(p.getCategory()))
            .collect(Collectors.toList());
    }

    private Project createProject(String id, String title, String description, String image,
                                   List<String> tags, String category, String github, String demo, boolean featured) {
        Project p = new Project();
        p.setId(id);
        p.setTitle(title);
        p.setDescription(description);
        p.setImage(image);
        p.setTags(tags);
        p.setCategory(category);
        p.setGithub(github);
        p.setDemo(demo);
        p.setFeatured(featured);
        return p;
    }
}
