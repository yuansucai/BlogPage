package com.webpage.model;

import java.util.List;

/**
 * 项目模型
 */
public class Project {
    private String id;
    private String title;
    private String description;
    private String image;
    private List<String> tags;
    private String category;
    private String github;
    private String demo;
    private boolean featured;

    public Project() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }

    public String getDemo() { return demo; }
    public void setDemo(String demo) { this.demo = demo; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
}
