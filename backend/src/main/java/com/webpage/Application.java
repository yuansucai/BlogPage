package com.webpage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * WebPage 后端应用入口
 *
 * 启动命令：mvn spring-boot:run
 * 访问地址：http://localhost:8080
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
