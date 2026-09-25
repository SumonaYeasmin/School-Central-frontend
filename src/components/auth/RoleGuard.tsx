"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserRole } from "@/src/types/user.interface";
import { ShieldAlert, ArrowRight, Loader2, Lock } from "lucide-react";
import Link from "next/link";

interface RoleGuardProps {
  children: React.ReactNode;
}

export function RoleGuard({ children }: RoleGuardProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Determine required role for the active route
    const requiredRole: UserRole | null = pathname.startsWith("/admin")
      ? "ADMIN"
      : pathname.startsWith("/teacher")
      ? "TEACHER"
      : pathname.startsWith("/dashboard")
      ? "PARENT"
      : null;

    if (!requiredRole) {
      setIsAuthorized(true);
      return;
    }

    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      const storedRole = (localStorage.getItem("userRole") as UserRole) || null;

      if (!storedUserInfo && !storedRole) {
        // Not logged in -> redirect to login
        setIsAuthorized(false);
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      const parsedUser = storedUserInfo ? JSON.parse(storedUserInfo) : null;
      const effectiveRole: UserRole = (parsedUser?.role as UserRole) || storedRole || "PARENT";
      setCurrentUserRole(effectiveRole);

      // Check role permissions:
      // ADMIN has full access across all dashboards
      // TEACHER has access to /teacher
      // PARENT has access to /dashboard
      if (effectiveRole === "ADMIN") {
        setIsAuthorized(true);
      } else if (effectiveRole === "TEACHER" && requiredRole === "TEACHER") {
        setIsAuthorized(true);
      } else if (effectiveRole === "PARENT" && requiredRole === "PARENT") {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch {
      setIsAuthorized(false);
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router]);

  // While determining authorization state
  if (isAuthorized === null) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3 font-sans">
        <div className="h-10 w-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-semibold">Verifying secure role credentials...</p>
      </div>
    );
  }

  // If unauthorized for this specific portal
  if (!isAuthorized) {
    const redirectTarget =
      currentUserRole === "ADMIN"
        ? "/admin/dashboard"
        : currentUserRole === "TEACHER"
        ? "/teacher/dashboard"
        : "/dashboard/overview";

    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white border border-rose-200 rounded-3xl p-8 text-center space-y-5 shadow-xl">
          <div className="h-16 w-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto shadow-xs">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold tracking-widest text-rose-600 uppercase">
              Access Restricted
            </span>
            <h2 className="text-xl font-black text-slate-900">Portal Authorization Required</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Your logged-in role (<span className="font-bold text-slate-800">{currentUserRole || "Guest"}</span>) does not have permission to view this section.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <Link
              href={redirectTarget}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-blue-600/20 cursor-pointer"
            >
              <span>Go to My Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
            >
              Switch Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
