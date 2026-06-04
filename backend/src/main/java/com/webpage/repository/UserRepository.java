package com.webpage.repository;

import com.webpage.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 用户数据访问层
 * Spring Data JPA 根据方法名自动生成 SQL：
 *   findByUsername("admin") → SELECT * FROM users WHERE username = 'admin'
 */
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}
