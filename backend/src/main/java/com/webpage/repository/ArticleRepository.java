package com.webpage.repository;

import com.webpage.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 文章数据访问层（Repository）
 *
 * JpaRepository<Article, Long> 会自动提供以下方法（不需要写任何 SQL）：
 *   findAll()           — 查询所有文章
 *   findById(id)        — 按主键查询单篇文章
 *   save(article)       — 新增或更新文章
 *   deleteById(id)      — 按主键删除
 *   count()             — 统计总数
 *   existsById(id)      — 判断是否存在
 *
 * 自定义查询：Spring Data JPA 会根据方法名自动生成 SQL
 *   findByType(String type) → SELECT * FROM articles WHERE type = ?
 */
public interface ArticleRepository extends JpaRepository<Article, Long> {

    /**
     * 按类型查询文章列表
     * 方法名规则：findBy + 字段名（首字母大写）
     * Spring Data JPA 会自动解析方法名，生成对应的 SQL
     */
    List<Article> findByType(String type);
}
