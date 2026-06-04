/**
 * API 工具函数
 * 封装 fetch 请求，统一处理后端 ApiResponse 格式
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface Profile {
  name: string;
  avatar: string;
  title: string;
  bio: string;
  about: string[];
  social: Record<string, string>;
  location: string;
  company: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  github?: string;
  demo?: string;
  featured: boolean;
}

export interface Article {
  id?: number;
  title: string;
  excerpt: string;
  content?: string;
  type: "travel" | "tech";
  date: string;
  readTime?: string;
  tags: string[];
  url: string;
  thumbnail?: string;
}

export interface UploadImageResult {
  url: string;
  filename: string;
}

interface TechItem {
  name: string;
  icon: string;
  category: string;
  description: string;
}

/**
 * 通用 fetch 封装（公开接口，不需要 token）
 */
async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`请求失败: ${res.status} ${res.statusText}`);
  }
  const json: ApiResponse<T> = await res.json();
  if (json.code !== 200) {
    throw new Error(json.message || "请求失败");
  }
  return json.data;
}

/**
 * 通用 fetch 封装（需要 token 的接口）
 * 从 localStorage 读取 token，放到请求头中
 */
async function fetchApiAuth<T>(path: string): Promise<T> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("未登录");
  }
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    throw new Error("登录已过期，请重新登录");
  }
  if (!res.ok) {
    throw new Error(`请求失败: ${res.status} ${res.statusText}`);
  }
  const json: ApiResponse<T> = await res.json();
  if (json.code !== 200) {
    throw new Error(json.message || "请求失败");
  }
  return json.data;
}

// ==================== 公开接口 ====================

export async function fetchHealth() {
  return fetchApi<{ status: string }>("/api/health");
}

export async function fetchProfile() {
  return fetchApi<Profile>("/api/profile");
}

export async function fetchProjects(category?: string) {
  const params = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchApi<Project[]>(`/api/projects${params}`);
}

export async function fetchArticles(type?: string) {
  const params = type ? `?type=${encodeURIComponent(type)}` : "";
  return fetchApi<Article[]>(`/api/articles${params}`);
}

export async function fetchArticleById(id: string) {
  return fetchApi<Article>(`/api/articles/${id}`);
}

export async function fetchTechStack() {
  return fetchApi<TechItem[]>("/api/techstack");
}

// ==================== 登录接口 ====================

/**
 * 登录
 * @returns { token, username, role }
 */
export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const json: ApiResponse<{ token: string; username: string; role: string }> =
    await res.json();
  if (json.code !== 200) {
    throw new Error(json.message || "登录失败");
  }
  // 保存 token 到 localStorage
  localStorage.setItem("token", json.data.token);
  localStorage.setItem("username", json.data.username);
  return json.data;
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}

/**
 * 获取当前登录状态
 */
export function getLoginStatus() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  return { isLoggedIn: !!token, username };
}

// ==================== 需要登录的接口 ====================

/**
 * 带 token 的请求封装（支持 GET/POST/PUT/DELETE）
 */
async function fetchApiAuthMethod<T>(
  path: string,
  method: string,
  body?: unknown
): Promise<T> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("未登录");

  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, options);
  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    throw new Error("登录已过期，请重新登录");
  }
  if (!res.ok) {
    throw new Error(`请求失败: ${res.status} ${res.statusText}`);
  }
  const json: ApiResponse<T> = await res.json();
  if (json.code !== 200) {
    throw new Error(json.message || "请求失败");
  }
  return json.data;
}

export async function fetchAdminArticles() {
  return fetchApiAuthMethod<Article[]>("/api/admin/articles", "GET");
}

export async function createAdminArticle(article: Omit<Article, "id">) {
  return fetchApiAuthMethod<Article>("/api/admin/articles", "POST", article);
}

export async function updateAdminArticle(id: number, article: Omit<Article, "id">) {
  return fetchApiAuthMethod<Article>(`/api/admin/articles/${id}`, "PUT", article);
}

export async function deleteAdminArticle(id: number) {
  return fetchApiAuthMethod<string>(`/api/admin/articles/${id}`, "DELETE");
}

export async function uploadAdminImage(file: File) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("未登录");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/admin/uploads/images`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    throw new Error("登录已过期，请重新登录");
  }
  if (!res.ok) {
    throw new Error(`请求失败: ${res.status} ${res.statusText}`);
  }

  const json: ApiResponse<UploadImageResult> = await res.json();
  if (json.code !== 200) {
    throw new Error(json.message || "图片上传失败");
  }
  return json.data;
}

/**
 * 修改密码（需要 token）
 */
export async function changePassword(oldPassword: string, newPassword: string) {
  return fetchApiAuthMethod<string>("/api/auth/change-password", "POST", {
    oldPassword,
    newPassword,
  });
}
