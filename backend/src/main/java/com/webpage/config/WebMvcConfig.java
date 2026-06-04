package com.webpage.config;

import com.webpage.interceptor.AuthInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Web MVC 配置
 * 注册拦截器并配置拦截路径
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;
    private final String uploadImageDir;

    public WebMvcConfig(
        AuthInterceptor authInterceptor,
        @Value("${app.upload.image-dir:uploads/images}") String uploadImageDir
    ) {
        this.authInterceptor = authInterceptor;
        this.uploadImageDir = uploadImageDir;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
            .addPathPatterns("/api/admin/**")   // 拦截 /api/admin/ 下所有请求
            .excludePathPatterns(               // 排除不需要认证的路径
                "/api/auth/**",                 // 登录/注册接口
                "/api/health"                   // 健康检查
            );
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path imagePath = Paths.get(uploadImageDir).toAbsolutePath().normalize();
        String imageLocation = imagePath.toUri().toString();
        if (!imageLocation.endsWith("/")) {
            imageLocation += "/";
        }

        registry.addResourceHandler("/uploads/images/**")
            .addResourceLocations(imageLocation);
    }
}
