"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLoginStatus, logout, changePassword } from "@/lib/api";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);

  useEffect(() => {
    const { isLoggedIn } = getLoginStatus();
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!checked) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center">
        <div className="text-stone-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
              J
            </div>
            <span className="text-stone-800 font-semibold">后台管理</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-500">
              {getLoginStatus().username}
            </span>
            <button
              onClick={() => setShowPwdModal(true)}
              className="px-4 py-1.5 text-sm text-stone-500 border border-stone-200 rounded-lg hover:text-stone-800 hover:border-stone-300 transition-all"
            >
              修改密码
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 text-sm text-stone-500 border border-stone-200 rounded-lg hover:text-stone-800 hover:border-stone-300 transition-all"
            >
              退出
            </button>
          </div>
        </div>
      </header>

      {/* 页面内容 */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>

      {/* 修改密码弹窗 */}
      {showPwdModal && (
        <ChangePasswordModal onClose={() => setShowPwdModal(false)} />
      )}
    </div>
  );
}

// MUI 浅色主题输入框样式（复用）
const lightTextFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "#2D2A26",
  },
};

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  show,
  onToggle,
  minLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  show: boolean;
  onToggle: () => void;
  minLength?: number;
}) {
  return (
    <TextField
      label={label}
      type={show ? "text" : "password"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
      fullWidth
      variant="outlined"
      slotProps={{
        htmlInput: minLength ? { minLength } : undefined,
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={onToggle}
                edge="end"
                sx={{ color: "rgba(0,0,0,0.4)" }}
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{ ...lightTextFieldSx, mb: 3 }}
    />
  );
}

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("两次输入的新密码不一致");
      return;
    }

    setLoading(true);
    try {
      await changePassword(oldPassword, newPassword);
      setSuccess("密码修改成功");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "修改失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white shadow-lg border border-stone-200 rounded-2xl p-10">
        <h2 className="text-xl font-bold text-stone-800 mb-8">修改密码</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <PasswordField
            label="旧密码"
            value={oldPassword}
            onChange={setOldPassword}
            placeholder="请输入旧密码"
            show={showOld}
            onToggle={() => setShowOld(!showOld)}
          />
          <PasswordField
            label="新密码"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="至少 6 位"
            show={showNew}
            onToggle={() => setShowNew(!showNew)}
            minLength={6}
          />
          <PasswordField
            label="确认新密码"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="再输入一次新密码"
            show={showConfirm}
            onToggle={() => setShowConfirm(!showConfirm)}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-stone-500 border border-stone-200 rounded-lg hover:text-stone-800 hover:border-stone-300 transition-all"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 transition-all"
            >
              {loading ? "修改中..." : "确认修改"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
