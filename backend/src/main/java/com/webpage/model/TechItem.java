package com.webpage.model;

/**
 * 技术栈模型
 */
public class TechItem {
    private String name;
    private String icon;
    private String category;
    private String description;

    public TechItem() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
