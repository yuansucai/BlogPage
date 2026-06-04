package com.webpage.interceptor;

import com.webpage.util.JwtUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 认证拦截器
 *
 * 工作原理：
 * 1. 前端请求到达 Controller 之前，Spring 先执行这个拦截器
 * 2. 拦截器从请求头中取出 token 并验证
 * 3. 验证通过 → 放行到 Controller
 * 4. 验证失败 → 返回 401，请求不会到达 Controller
 *
 * 类比：相当于大楼门口的保安，检查你的工牌（token）才能进
 */
@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;

    public AuthInterceptor(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // OPTIONS 预检请求直接放行（CORS 需要）
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        // 从请求头中获取 Authorization 字段
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"code\":401,\"message\":\"未登录，请先登录\",\"data\":null}");
            return false;
        }

        try {
            // 去掉 "Bearer " 前缀，解析 token
            String token = authHeader.substring(7);
            jwtUtil.parseToken(token);
            return true; // 验证通过，放行
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"code\":401,\"message\":\"Token 无效或已过期\",\"data\":null}");
            return false;
        }
    }
}
