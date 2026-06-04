package com.webpage.controller;

import com.webpage.common.ApiResponse;
import com.webpage.model.Article;
import com.webpage.service.ArticleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 文章控制器
 */
@RestController
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    /**
     * 获取文章列表
     * @param type 类型筛选（可选），"travel" 或 "tech"
     */
    @GetMapping("/api/articles")
    public ApiResponse<List<Article>> getArticles(
            @RequestParam(required = false) String type) {
        return ApiResponse.success(articleService.getArticles(type));
    }

    /**
     * 获取文章详情
     * @param id 文章 ID
     */
    @GetMapping("/api/articles/{id}")
    public ApiResponse<Article> getArticleById(@PathVariable Long id) {
        return articleService.getArticleById(id)
            .map(ApiResponse::success)
            .orElse(ApiResponse.error(404, "文章不存在"));
    }
}
