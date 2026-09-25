"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  ShieldCheck,
  GraduationCap,
  School,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { loginUser } from "@/src/services/auth/authService";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeRoleTab, setActiveRoleTab] = useState<"ADMIN" | "TEACHER" | "PARENT">("ADMIN");

  // Quick fill helper for testing/demo
  const handleQuickFill = (role: "ADMIN" | "TEACHER" | "PARENT") => {
    setActiveRoleTab(role);
    setErrorMsg(null);
    if (role === "ADMIN") {
      setEmail("admin@school.com");
      setPassword("123456");
    } else if (role === "TEACHER") {
      setEmail("teacher@school.com");
      setPassword("123456");
    } else {
      setEmail("parent@school.com");
      setPassword("123456");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both email address and password.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg(null);

      const res = await loginUser({
        email: email.trim(),
        password: password.trim(),
      });

      if (res && res.user) {
        const userRole = res.user.role;
        if (userRole === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (userRole === "TEACHER") {
          router.push("/teacher/dashboard");
        } else {
          router.push("/dashboard/overview");
        }
      } else {
        router.push("/dashboard/overview");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid credentials. Please check your email and password.";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50/80 font-sans p-4 sm:p-6 relative selection:bg-blue-600 selection:text-white">
      
      {/* Back to Home Link */}
      <div className="w-full max-w-[500px] mb-3 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors group px-3 py-1.5 rounded-full hover:bg-white border border-transparent hover:border-slate-200"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Login Card (Dark/Navy Form Card on White Page) */}
      <div className="w-full max-w-[500px] bg-[#070b14] border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-900/15 text-slate-100 space-y-6">
        
        {/* Title Header */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Sign In to Your Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Enter your official credentials to access your dashboard.
          </p>
        </div>

        {/* Role Tabs */}
        <div className="p-1 rounded-2xl bg-[#0c1322] border border-slate-800/90 grid grid-cols-3 gap-1.5 shadow-inner">
          <button
            type="button"
            onClick={() => handleQuickFill("ADMIN")}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRoleTab === "ADMIN"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Admin</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFill("TEACHER")}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRoleTab === "TEACHER"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>Teacher</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFill("PARENT")}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRoleTab === "PARENT"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <School className="h-4 w-4" />
            <span>Parent</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-blue-400" />
              <span>EMAIL ADDRESS</span>
            </label>
            <div className="relative">
              <Input
                type="email"
                placeholder="name@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 sm:h-12 rounded-xl border-slate-800 bg-[#0a101d] text-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 placeholder:text-slate-500 pl-4"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-blue-400" />
                <span>PASSWORD</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Please contact administrator to reset password.")}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 sm:h-12 rounded-xl border-slate-800 bg-[#0a101d] text-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 placeholder:text-slate-500 pl-4 pr-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>Remember this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 sm:h-12 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Demo Accounts Card */}
        <div className="p-4 rounded-2xl bg-[#0a101d] border border-slate-800/90 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              DEMO ACCOUNTS (CLICK TO FILL)
            </span>
            <span className="text-xs text-blue-400 font-mono font-bold">
              Pass: 123456
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <button
              type="button"
              onClick={() => handleQuickFill("ADMIN")}
              className="py-2 px-2 rounded-xl bg-[#111a2e] hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors border border-slate-800 hover:border-slate-700 cursor-pointer truncate"
              title="admin@school.com"
            >
              admin@school.com
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("TEACHER")}
              className="py-2 px-2 rounded-xl bg-[#111a2e] hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors border border-slate-800 hover:border-slate-700 cursor-pointer truncate"
              title="teacher@school.com"
            >
              teacher@school.com
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("PARENT")}
              className="py-2 px-2 rounded-xl bg-[#111a2e] hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors border border-slate-800 hover:border-slate-700 cursor-pointer truncate"
              title="parent@school.com"
            >
              parent@school.com
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
