"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  ArrowLeft,
  School,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Users,
  Sparkles,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { loginUser } from "@/src/services/auth/authService";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both your email address and password.");
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

        // If redirect URL is given and role matches, prioritize redirect
        if (redirectUrl) {
          if (
            (redirectUrl.startsWith("/admin") && userRole === "ADMIN") ||
            (redirectUrl.startsWith("/teacher") && (userRole === "TEACHER" || userRole === "ADMIN")) ||
            (redirectUrl.startsWith("/dashboard") && (userRole === "PARENT" || userRole === "ADMIN"))
          ) {
            router.push(redirectUrl);
            return;
          }
        }

        // Automatic redirection based on logged-in user's role
        if (userRole === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (userRole === "TEACHER") {
          router.push("/teacher/dashboard");
        } else if (userRole === "PARENT") {
          router.push("/dashboard/overview");
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
        "Invalid email or password. Please check your credentials and try again.";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50/80 font-sans p-4 sm:p-6 relative selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home Link */}
      <div className="w-full max-w-[480px] mb-4 flex items-center justify-between relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors group px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-slate-200/80 shadow-2xs"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          Auth System v2.0
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[480px] bg-[#070b14] border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-900/20 text-slate-100 space-y-5 relative z-10">
        {/* Brand & Header */}
        <div className="flex flex-col items-center text-center space-y-2.5">
          <div className="h-13 w-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-lg shadow-blue-500/25 flex items-center justify-center">
            <div className="h-full w-full bg-[#0a101d] rounded-[14px] flex items-center justify-center">
              <School className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Sign In to School Central
            </h1>
            <p className="text-xs text-slate-400">
              Role-protected access for Admin, Teachers & Parents
            </p>
          </div>
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
          {/* Email or Phone or ID */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-blue-400" />
              <span>Email, Teacher ID or Phone</span>
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter email or teacher ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl border-slate-800 bg-[#0a101d] text-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 placeholder:text-slate-500 pl-4"
                required
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-blue-400" />
                <span>Password</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Demo Password: 123456\nOr contact administrator.")}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-xl border-slate-800 bg-[#0a101d] text-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 placeholder:text-slate-500 pl-4 pr-11"
                required
                autoComplete="current-password"
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
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300 font-medium">
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
            className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In Securely</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Portal Notice */}
        <div className="pt-2 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
            <span>Guarded role routing: Admin ➔ /admin | Teacher ➔ /teacher | Parent ➔ /dashboard</span>
          </p>
        </div>
      </div>
    </div>
  );
}
