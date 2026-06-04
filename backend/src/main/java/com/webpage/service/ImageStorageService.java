package com.webpage.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

/**
 * 图片存储服务
 * 将后台上传的文章配图保存到本地磁盘，并生成安全的文件名
 */
@Service
public class ImageStorageService {

    private static final Set<String> ALLOWED_EXTENSIONS = new HashSet<>(
        Arrays.asList("jpg", "jpeg", "png", "gif", "webp")
    );

    private final Path imageDir;

    public ImageStorageService(@Value("${app.upload.image-dir:uploads/images}") String imageDir) {
        this.imageDir = Paths.get(imageDir).toAbsolutePath().normalize();
    }

    public String saveImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("请选择要上传的图片");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("只能上传图片文件");
        }

        String extension = getExtension(file.getOriginalFilename());
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("仅支持 jpg、png、gif、webp 图片");
        }

        Files.createDirectories(imageDir);

        String filename = UUID.randomUUID().toString().replace("-", "") + "." + extension;
        Path target = imageDir.resolve(filename).normalize();
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        return filename;
    }

    private String getExtension(String originalFilename) {
        if (originalFilename == null || originalFilename.trim().isEmpty()) {
            throw new IllegalArgumentException("图片文件名不能为空");
        }

        String filename = originalFilename.trim();
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex < 0 || dotIndex == filename.length() - 1) {
            throw new IllegalArgumentException("图片文件类型不受支持");
        }
        return filename.substring(dotIndex + 1).toLowerCase(Locale.ROOT);
    }
}
