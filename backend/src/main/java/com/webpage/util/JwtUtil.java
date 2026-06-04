package com.webpage.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * JWT 工具类
 *
 * JWT (JSON Web Token) 是一种无状态的认证机制：
 * 1. 用户登录成功 → 服务端生成一个加密的 token 字符串返回给前端
 * 2. 前端每次请求带上这个 token（放在 HTTP 请求头里）
 * 3. 服务端解析 token 验证用户身份（不需要查数据库，因为信息都在 token 里）
 *
 * Token 结构：Header.Payload.Signature（三段用 . 分隔）
 */
@Component
public class JwtUtil {

    // 密钥（生产环境应该放在配置文件或环境变量中，不能硬编码）
    private static final String SECRET_KEY = "webpage-secret-key-2024";
    // Token 有效期：24 小时（单位：毫秒）
    private static final long EXPIRATION_MS = 24 * 60 * 60 * 1000;

    /**
     * 生成 JWT Token
     * @param username 用户名
     * @param role 角色
     * @return 加密后的 token 字符串
     */
    public String generateToken(String username, String role) {
        return Jwts.builder()
            .setSubject(username)                    // 设置主题（用户名）
            .claim("role", role)                     // 自定义字段：角色
            .setIssuedAt(new Date())                 // 签发时间
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))  // 过期时间
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)  // 用 HS256 算法 + 密钥签名
            .compact();
    }

    /**
     * 解析并验证 Token
     * @param token 前端传来的 token
     * @return 解析后的 Claims（包含用户名、角色等信息）
     * @throws io.jsonwebtoken.JwtException token 无效或过期时抛出异常
     */
    public Claims parseToken(String token) {
        return Jwts.parser()
            .setSigningKey(SECRET_KEY)
            .parseClaimsJws(token)
            .getBody();
    }

    /**
     * 从 token 中获取用户名
     */
    public String getUsername(String token) {
        return parseToken(token).getSubject();
    }
}
