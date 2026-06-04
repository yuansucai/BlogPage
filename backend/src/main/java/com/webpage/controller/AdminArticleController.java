package com.webpage.controller;

import com.webpage.common.ApiResponse;
import com.webpage.model.Article;
import com.webpage.service.ArticleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 后台文章管理控制器
 * 所有 /api/admin/** 的请求都会经过 AuthInterceptor 验证 token
 */
@RestController
@RequestMapping("/api/admin")
public class AdminArticleController {

    private final ArticleService articleService;

    public AdminArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    /**
     * 获取文章列表
     * GET /api/admin/articles
     */
    @GetMapping("/articles")
    public ApiResponse<List<Article>> getArticles() {
        return ApiResponse.success(articleService.getArticles(null));
    }

    /**
     * 新增文章
     * POST /api/admin/articles
     * 请求体：Article JSON
     */
    @PostMapping("/articles")
    public ApiResponse<Article> createArticle(@RequestBody Article article) {
        return ApiResponse.success(articleService.createArticle(article));
    }

    /**
     * 修改文章
     * PUT /api/admin/articles/{id}
     * 请求体：Article JSON
     */
    @PutMapping("/articles/{id}")
    public ApiResponse<Article> updateArticle(@PathVariable Long id, @RequestBody Article article) {
        return ApiResponse.success(articleService.updateArticle(id, article));
    }

    /**
     * 删除文章
     * DELETE /api/admin/articles/{id}
     */
    @DeleteMapping("/articles/{id}")
    public ApiResponse<String> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ApiResponse.success("删除成功");
    }
}
