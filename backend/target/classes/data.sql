-- =====================================================
-- 初始化文章数据
-- Spring Boot 启动时会自动执行此文件
-- 注意：INSERT 的字段顺序必须和表结构一致
-- =====================================================

UPDATE articles SET type = 'tech' WHERE type IN ('article', 'video');

INSERT IGNORE INTO articles (title, excerpt, content, type, date, read_time, tags, url, thumbnail)
VALUES (
    'Next.js 15 新特性深度解析：Server Actions 与 Partial Prerendering',
    '深入分析 Next.js 15 带来的革命性变化，包括 Server Actions 的正式稳定、Partial Prerendering 的工作原理及实战应用。',
    '# Next.js 15 深度解析

## 前言
在现代 Web 开发中，Next.js 15 已经成为开发者必须掌握的核心技术之一。本文将深入探讨 Server Actions 的原理和实践。

## 核心概念
### 什么是 Server Actions
Server Actions 是一种先进的技术方案，它能够帮助开发者更高效地构建现代化的 Web 应用。

### Partial Prerendering 的优势
1. **性能提升** - 显著减少首屏加载时间
2. **开发体验** - 更好的代码组织和调试体验
3. **类型安全** - 编译时错误检查，减少运行时 bug
4. **生态系统** - 丰富的社区资源和第三方库支持

## 实战指南
### 环境准备
```bash
npx create-next-app@latest my-app
cd my-app
npm install
```

### 基础用法
```typescript
import { useState } from ''react'';
export default function Page() {
  const [data, setData] = useState(null);
  return <div><h1>Next.js 15 示例</h1></div>;
}
```

## 总结
Next.js 15 为 Web 开发带来了革命性的变化。',
    'tech',
    '2025-12-15',
    '12 分钟',
    'Next.js,React,SSR',
    'https://juejin.cn/post/nextjs15',
    null
);

INSERT IGNORE INTO articles (title, excerpt, content, type, date, read_time, tags, url, thumbnail)
VALUES (
    '手把手教你搭建 AI 聊天应用：从零到部署',
    '完整教程，使用 Next.js + OpenAI API 构建一个支持流式响应、多轮对话的智能聊天应用。',
    '# AI 聊天应用 深度解析

## 前言
在现代 Web 开发中，AI 聊天应用 已经成为开发者必须掌握的核心技术之一。本文将深入探讨 OpenAI API 的原理和实践。

## 核心概念
### 什么是 OpenAI API
OpenAI API 是一种先进的技术方案，它能够帮助开发者更高效地构建现代化的 Web 应用。

### 流式响应 的优势
1. **性能提升** - 显著减少首屏加载时间
2. **开发体验** - 更好的代码组织和调试体验
3. **类型安全** - 编译时错误检查，减少运行时 bug
4. **生态系统** - 丰富的社区资源和第三方库支持

## 实战指南
### 环境准备
```bash
npx create-next-app@latest my-app
cd my-app
npm install
```

## 总结
AI 聊天应用 为 Web 开发带来了革命性的变化。',
    'tech',
    '2025-11-28',
    '45 分钟',
    'AI,OpenAI,Next.js',
    'https://bilibili.com/video/ai-chat',
    '/articles/ai-chat-thumb.svg'
);

INSERT IGNORE INTO articles (title, excerpt, content, type, date, read_time, tags, url, thumbnail)
VALUES (
    'TypeScript 高级类型体操：从入门到精通',
    '系统讲解 TypeScript 高级类型编程，包括条件类型、映射类型、模板字面量类型等进阶用法。',
    '# TypeScript 深度解析

## 前言
在现代 Web 开发中，TypeScript 已经成为开发者必须掌握的核心技术之一。本文将深入探讨 高级类型 的原理和实践。

## 核心概念
### 什么是 高级类型
高级类型 是一种先进的技术方案，它能够帮助开发者更高效地构建现代化的 Web 应用。

### 类型体操 的优势
1. **性能提升** - 显著减少首屏加载时间
2. **开发体验** - 更好的代码组织和调试体验
3. **类型安全** - 编译时错误检查，减少运行时 bug
4. **生态系统** - 丰富的社区资源和第三方库支持

## 总结
TypeScript 为 Web 开发带来了革命性的变化。',
    'tech',
    '2025-10-20',
    '18 分钟',
    'TypeScript,类型系统',
    'https://juejin.cn/post/ts-advanced',
    null
);

INSERT IGNORE INTO articles (title, excerpt, content, type, date, read_time, tags, url, thumbnail)
VALUES (
    'Tailwind CSS v4 重大更新：CSS-first 配置全面解析',
    'Tailwind CSS v4 正式发布，全面转向 CSS-first 配置方式。本文详解新特性、迁移指南和最佳实践。',
    '# Tailwind CSS v4 深度解析

## 前言
在现代 Web 开发中，Tailwind CSS v4 已经成为开发者必须掌握的核心技术之一。本文将深入探讨 CSS-first 的原理和实践。

## 核心概念
### 什么是 CSS-first
CSS-first 是一种先进的技术方案，它能够帮助开发者更高效地构建现代化的 Web 应用。

### 配置方式 的优势
1. **性能提升** - 显著减少首屏加载时间
2. **开发体验** - 更好的代码组织和调试体验
3. **类型安全** - 编译时错误检查，减少运行时 bug
4. **生态系统** - 丰富的社区资源和第三方库支持

## 总结
Tailwind CSS v4 为 Web 开发带来了革命性的变化。',
    'tech',
    '2025-09-15',
    '10 分钟',
    'Tailwind CSS,CSS,前端',
    'https://juejin.cn/post/tailwind-v4',
    null
);

INSERT IGNORE INTO articles (title, excerpt, content, type, date, read_time, tags, url, thumbnail)
VALUES (
    'React Server Components 原理解析与实战',
    '深入理解 RSC 的工作原理，包括序列化机制、服务端/客户端组件边界、数据获取模式等核心概念。',
    '# React Server Components 深度解析

## 前言
在现代 Web 开发中，React Server Components 已经成为开发者必须掌握的核心技术之一。本文将深入探讨 RSC 的原理和实践。

## 核心概念
### 什么是 RSC
RSC 是一种先进的技术方案，它能够帮助开发者更高效地构建现代化的 Web 应用。

### 服务端组件 的优势
1. **性能提升** - 显著减少首屏加载时间
2. **开发体验** - 更好的代码组织和调试体验
3. **类型安全** - 编译时错误检查，减少运行时 bug
4. **生态系统** - 丰富的社区资源和第三方库支持

## 总结
React Server Components 为 Web 开发带来了革命性的变化。',
    'tech',
    '2025-08-10',
    '38 分钟',
    'React,RSC,架构',
    'https://bilibili.com/video/rsc-deep-dive',
    '/articles/rsc-thumb.svg'
);

INSERT IGNORE INTO articles (title, excerpt, content, type, date, read_time, tags, url, thumbnail)
VALUES (
    '用 Docker Compose 一键部署全栈应用',
    '从 Dockerfile 编写到 docker-compose.yml 编排，完整演示如何容器化部署 Next.js + PostgreSQL + Redis 应用。',
    '# Docker Compose 深度解析

## 前言
在现代 Web 开发中，Docker Compose 已经成为开发者必须掌握的核心技术之一。本文将深入探讨 容器化部署 的原理和实践。

## 核心概念
### 什么是 容器化部署
容器化部署 是一种先进的技术方案，它能够帮助开发者更高效地构建现代化的 Web 应用。

### 全栈应用 的优势
1. **性能提升** - 显著减少首屏加载时间
2. **开发体验** - 更好的代码组织和调试体验
3. **类型安全** - 编译时错误检查，减少运行时 bug
4. **生态系统** - 丰富的社区资源和第三方库支持

## 总结
Docker Compose 为 Web 开发带来了革命性的变化。',
    'tech',
    '2025-07-22',
    '15 分钟',
    'Docker,DevOps,部署',
    'https://juejin.cn/post/docker-deploy',
    null
);

-- =====================================================
-- 初始化管理员账号
-- 密码是 admin123（BCrypt 加密存储，数据库里不存明文）
-- =====================================================
INSERT IGNORE INTO users (username, password, role) VALUES (
    'admin',
    '$2b$10$KX3vko6uLb6vgzZrcaLnJuSgbmzf8ShmaDSUN36nbNporCOYhTcm2',
    'admin'
);
