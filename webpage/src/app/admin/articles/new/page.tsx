"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminArticle } from "@/lib/api";
import {
  Button, TextField, Select, MenuItem, FormControl, InputLabel,
  Box, Snackbar, Alert, Typography, SelectChangeEvent,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import RichTextEditor from "@/components/RichTextEditor";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  type: "tech" as const,
  date: new Date().toISOString().slice(0, 10),
  readTime: "",
  tags: [] as string[],
  url: "",
  thumbnail: "",
};

const lightSx = {
  "& .MuiOutlinedInput-root": {
    color: "#2D2A26",
  },
};

export default function NewArticlePage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string; severity: "success" | "error" }>({
    open: false, msg: "", severity: "success",
  });

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setSnackbar({ open: true, msg: "标题不能为空", severity: "error" });
      return;
    }

    const articleData = {
      ...form,
      tags: tagInput.split(",").map((t) => t.trim()).filter(Boolean),
    };

    setSubmitting(true);
    try {
      await createAdminArticle(articleData);
      router.push("/admin");
    } catch (err) {
      const message = err instanceof Error ? err.message : "新增失败";
      setSnackbar({ open: true, msg: message, severity: "error" });
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Box display="flex" alignItems="center" gap={1.5} mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push("/admin")}
          sx={{ color: "#8A8580", textTransform: "none" }}
        >
          返回
        </Button>
        <Typography variant="h5" fontWeight="bold" color="inherit">
          新增文章
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: '100%',
          p: 4,
          background: "#FFFFFF",
          border: "1px solid #E8E2DA",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <TextField
          label="标题"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          required
          fullWidth
          sx={lightSx}
        />
        <TextField
          label="摘要"
          value={form.excerpt}
          onChange={(e) => updateField("excerpt", e.target.value)}
          fullWidth
          multiline
          rows={2}
          sx={lightSx}
        />
        <Box>
          <Typography variant="body2" sx={{ color: "#8A8580", mb: 1 }}>
            内容
          </Typography>
          <RichTextEditor
            content={form.content}
            onChange={(html) => updateField("content", html)}
          />
        </Box>
        <FormControl>
          <InputLabel>类型</InputLabel>
          <Select
            value={form.type}
            label="类型"
            onChange={(e: SelectChangeEvent) => updateField("type", e.target.value)}
          >
            <MenuItem value="travel">旅行</MenuItem>
            <MenuItem value="tech">技术</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="日期"
          type="date"
          value={form.date}
          onChange={(e) => updateField("date", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ ...lightSx }}
        />
        <TextField
          label="阅读时长"
          value={form.readTime}
          onChange={(e) => updateField("readTime", e.target.value)}
          placeholder="如：12 分钟"
          sx={{ ...lightSx }}
        />
        <TextField
          label="标签"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="用逗号分隔，如：React, Next.js, TypeScript"
          fullWidth
          sx={lightSx}
        />
        <TextField
          label="链接 URL"
          value={form.url}
          onChange={(e) => updateField("url", e.target.value)}
          fullWidth
          sx={lightSx}
        />

        <Box display="flex" gap={2} mt={1}>
          <Button
            onClick={() => router.push("/admin")}
            sx={{ color: "#8A8580", textTransform: "none" }}
          >
            取消
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting}
            sx={{
              background: "linear-gradient(135deg, #F59E0B, #F97316)",
              "&:hover": { background: "linear-gradient(135deg, #D97706, #EA580C)" },
              textTransform: "none",
            }}
          >
            {submitting ? "提交中..." : "确认新增"}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{ width: "100%" }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
