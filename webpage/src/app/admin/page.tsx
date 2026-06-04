"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchAdminArticles,
  deleteAdminArticle,
  Article,
} from "@/lib/api";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Chip, Box, Snackbar, Alert, Typography,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

export default function AdminPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<Article | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string; severity: "success" | "error" }>({
    open: false, msg: "", severity: "success",
  });

  const loadArticles = () => {
    fetchAdminArticles()
      .then(setArticles)
      .catch((err) => setSnackbar({ open: true, msg: err.message, severity: "error" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadArticles(); }, []);

  const handleDelete = async () => {
    if (!deleteDialog) return;
    try {
      await deleteAdminArticle(deleteDialog.id!);
      setSnackbar({ open: true, msg: "删除成功", severity: "success" });
      setDeleteDialog(null);
      loadArticles();
    } catch (err) {
      const message = err instanceof Error ? err.message : "删除失败";
      setSnackbar({ open: true, msg: message, severity: "error" });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <Typography color="gray">加载中...</Typography>
      </Box>
    );
  }

  return (
    <div>
      {/* 页面标题 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h5" fontWeight="bold" color="inherit">文章管理</Typography>
          <Typography variant="body2" color="gray" sx={{ mt: 1 }}>共 {articles.length} 篇文章</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push("/admin/articles/new")}
          sx={{
            background: "linear-gradient(135deg, #F59E0B, #F97316)",
            "&:hover": { background: "linear-gradient(135deg, #D97706, #EA580C)" },
            textTransform: "none",
            borderRadius: "8px",
            my: 2,
          }}
        >
          新增文章
        </Button>
      </Box>

      {/* 文章列表 */}
      <TableContainer
        component={Paper}
        sx={{
          background: "#FFFFFF",
          backdropFilter: "blur(20px)",
          border: "1px solid #E8E2DA",
          borderRadius: "12px",
          "& .MuiTableCell-root": {
            borderColor: "#E8E2DA",
            color: "#2D2A26",
          },
          "& .MuiTableHead-root .MuiTableCell-root": {
            color: "#8A8580",
            fontWeight: 600,
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>标题</TableCell>
              <TableCell width={80}>类型</TableCell>
              <TableCell width={110}>日期</TableCell>
              <TableCell width={90}>阅读时长</TableCell>
              <TableCell width={200}>标签</TableCell>
              <TableCell width={100} align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow
                key={article.id}
                sx={{ "&:hover": { background: "#FFFBF5" } }}
              >
                <TableCell>
                  <Typography fontWeight={500} noWrap sx={{ maxWidth: 300 }}>
                    {article.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={article.type === "travel" ? "旅行" : "技术"}
                    size="small"
                    sx={{
                      background: article.type === "travel"
                        ? "rgba(14,165,233,0.1)" : "rgba(16,185,129,0.1)",
                      color: article.type === "travel"
                        ? "#0284C7" : "#059669",
                      border: `1px solid ${article.type === "travel"
                        ? "rgba(14,165,233,0.2)" : "rgba(16,185,129,0.2)"}`,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: "#8A8580", fontSize: "0.875rem" }}>
                  {article.date}
                </TableCell>
                <TableCell sx={{ color: "#8A8580", fontSize: "0.875rem" }}>
                  {article.readTime}
                </TableCell>
                <TableCell>
                  <Box display="flex" flexWrap="wrap" gap={0.5}>
                    {article.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          background: "#F5F0EA",
                          color: "#6B6560",
                          border: "1px solid #E8E2DA",
                          fontSize: "0.75rem",
                        }}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => router.push(`/admin/articles/${article.id}/edit`)}
                    sx={{ color: "rgba(0,0,0,0.4)", "&:hover": { color: "#D97706" } }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setDeleteDialog(article)}
                    sx={{ color: "rgba(0,0,0,0.4)", "&:hover": { color: "#EF4444" } }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 删除确认弹窗 */}
      <Dialog
        open={!!deleteDialog}
        onClose={() => setDeleteDialog(null)}
        PaperProps={{
          sx: {
            background: "#FFFFFF",
            backdropFilter: "blur(20px)",
            border: "1px solid #E8E2DA",
            borderRadius: "16px",
            color: "#2D2A26",
          },
        }}
      >
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <Typography color="#4A4540">
            确定要删除文章「{deleteDialog?.title}」吗？此操作不可撤销。
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setDeleteDialog(null)}
            sx={{ color: "#8A8580", textTransform: "none" }}
          >
            取消
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ textTransform: "none" }}
          >
            确认删除
          </Button>
        </DialogActions>
      </Dialog>

      {/* 提示消息 */}
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
