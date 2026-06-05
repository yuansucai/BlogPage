# WebPage 后端

基于 Spring Boot 2.7 的 REST API 服务，为 WebPage 前端提供数据接口。

## 技术栈

- Java 8
- Spring Boot 2.7.18
- Maven

## 快速启动

```bash
# 进入后端目录
cd backend

# 编译并启动
mvn spring-boot:run
```

启动后访问 http://localhost:8080

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/health` | GET | 健康检查 |
| `/api/profile` | GET | 获取个人资料 |
| `/api/projects` | GET | 获取项目列表 |
| `/api/projects?category=AI 应用` | GET | 按分类筛选项目 |
| `/api/articles` | GET | 获取文章列表 |
| `/api/articles?type=travel` | GET | 按类型筛选旅行文章 |
| `/api/articles?type=tech` | GET | 按类型筛选技术文章 |
| `/api/techstack` | GET | 获取技术栈 |

## 部署配置

数据库连接支持用环境变量覆盖，避免服务器上的账号密码写进 Git：

```bash
DB_URL=jdbc:mysql://localhost:3306/webpage?useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
DB_USERNAME=webpage_user
DB_PASSWORD=your_password
```

服务器部署时建议把这些变量放在 `/etc/blogpage-backend.env`，并在启动后端前加载：

```bash
set -a
source /etc/blogpage-backend.env
set +a
java -jar target/webpage-backend-1.0.0.jar
```

## 响应格式

所有接口返回统一格式：

```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

## 运行测试

```bash
mvn test
```

## 项目结构

```
src/main/java/com/webpage/
├── Application.java          # 应用入口
├── config/
│   └── CorsConfig.java       # CORS 跨域配置
├── controller/               # 控制器层
├── model/                    # 数据模型
├── service/                  # 业务逻辑层
└── common/
    ├── ApiResponse.java      # 统一响应格式
    └── GlobalExceptionHandler.java  # 全局异常处理
```

## 后续扩展

1. **添加数据库**：引入 `spring-boot-starter-data-jpa`，将 Service 中的内存数据改为数据库查询
2. **添加认证**：引入 `spring-boot-starter-security` 实现用户认证
3. **添加缓存**：引入 `spring-boot-starter-data-redis` 提升性能
