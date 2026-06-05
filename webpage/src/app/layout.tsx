import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "./ClientProviders";

export const metadata: Metadata = {
  title: "程序员嘟嘟嘟 | 全栈工程师",
  description: "程序员嘟嘟嘟的个人网站 - 全栈工程师，专注于 React、Next.js、TypeScript 技术栈，热衷于用代码创造有价值的工具和产品。",
  keywords: ["程序员嘟嘟嘟", "全栈工程师", "Next.js", "React", "TypeScript", "Web 开发"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FFFBF5] text-stone-800">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
