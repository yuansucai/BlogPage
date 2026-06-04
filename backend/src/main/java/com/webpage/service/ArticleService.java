package com.webpage.service;

import com.webpage.model.Article;
import com.webpage.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * 文章服务
 * 使用数据库存储，通过 ArticleRepository 访问数据
 */
@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    // Spring 自动注入 Repository（构造函数注入，推荐方式）
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    /**
     * 获取所有文章，支持按类型筛选
     */
    public List<Article> getArticles(String type) {
        if (type == null || type.isEmpty()) {
            // findAll() — JPA 自带方法，等价于 SELECT * FROM articles
            return articleRepository.findAll();
        }
        // findByType() — 我们在 Repository 中自定义的方法
        // 等价于 SELECT * FROM articles WHERE type = ?
        return articleRepository.findByType(type);
    }

    /**
     * 根据 ID 获取文章详情
     * findById() 返回 Optional<Article>，这是一种优雅处理"可能为空"的方式
     */
    public Optional<Article> getArticleById(Long id) {
        return articleRepository.findById(id);
    }

    /**
     * 新增文章
     * save() — 主键为空时执行 INSERT
     */
    public Article createArticle(Article article) {
        article.setId(null); // 确保是新增
        return articleRepository.save(article);
    }

    /**
     * 修改文章
     * save() — 主键存在时执行 UPDATE
     */
    public Article updateArticle(Long id, Article article) {
        Article existing = articleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("文章不存在: " + id));
        existing.setTitle(article.getTitle());
        existing.setExcerpt(article.getExcerpt());
        existing.setContent(article.getContent());
        existing.setType(article.getType());
        existing.setDate(article.getDate());
        existing.setReadTime(article.getReadTime());
        existing.setTags(article.getTags());
        existing.setUrl(article.getUrl());
        existing.setThumbnail(article.getThumbnail());
        return articleRepository.save(existing);
    }

    /**
     * 删除文章
     * deleteById() — 按主键删除
     */
    public void deleteArticle(Long id) {
        if (!articleRepository.existsById(id)) {
            throw new RuntimeException("文章不存在: " + id);
        }
        articleRepository.deleteById(id);
    }
}
