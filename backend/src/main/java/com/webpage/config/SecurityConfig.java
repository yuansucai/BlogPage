package com.webpage.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security 配置
 *
 * 注意：我们只用 Spring Security 的 BCrypt 密码加密功能，
 * 不用它自带的登录/鉴权机制（我们自己用 JWT 实现了）。
 * 所以这里要关闭它的默认安全拦截，否则所有 API 都会被挡住。
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()              // 关闭 CSRF（前后端分离不需要）
            .formLogin().disable()         // 禁用默认登录页
            .httpBasic().disable()         // 禁用 HTTP Basic 认证
            .authorizeRequests()
            .anyRequest().permitAll();     // 放行所有请求（我们用自己的拦截器控制权限）
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
