package com.webpage.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * 文章模型
 *
 * JPA 注解说明：
 * @Entity — 告诉 JPA 这个类对应数据库中的一张表
 * @Table  — 指定表名（不写则默认用类名）
 * @Id     — 标记主键字段
 * @GeneratedValue — 主键自动生成策略（IDENTITY = 用数据库的自增功能）
 * @Column — 配置列的属性（长度、是否可空等）
 */
@Entity
@Table(name = "articles")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 200)
    private String title;

    @Column(length = 500)
    private String excerpt;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(length = 20)
    private String type;

    @Column(length = 20)
    private String date;

    @Column(length = 20)
    private String readTime;

    /**
     * tags 存储方式说明：
     * 数据库中以逗号分隔的字符串存储（如 "Next.js,React,SSR"）
     * Java 中以 List<String> 暴露给调用方
     * 这是一种简单但不完美的方案——后续学习中可以升级为 @ElementCollection（自动建关联表）
     */
    @Column(length = 500)
    private String tags;

    @Column(length = 500)
    private String url;

    @Column(length = 500)
    private String thumbnail;

    // JPA 要求必须有无参构造函数
    public Article() {}

    // ===== Getters & Setters =====

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getReadTime() { return readTime; }
    public void setReadTime(String readTime) { this.readTime = readTime; }

    /**
     * tags 的读写：内部存 String，外部暴露 List
     * 读：从 "Next.js,React,SSR" → ["Next.js", "React", "SSR"]
     * 写：从 ["Next.js", "React", "SSR"] → "Next.js,React,SSR"
     */
    public List<String> getTags() {
        if (tags == null || tags.isEmpty()) return Collections.emptyList();
        return Arrays.asList(tags.split(","));
    }

    public void setTags(List<String> tagList) {
        this.tags = (tagList == null || tagList.isEmpty()) ? null : String.join(",", tagList);
    }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }
}
