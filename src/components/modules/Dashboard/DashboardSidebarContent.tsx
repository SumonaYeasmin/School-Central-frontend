"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/src/lib/navitems.config";
import { UserInfo } from "@/src/types/user.interface";
import { getIconComponent } from "@/src/lib/icon-mapper";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { School, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";
import toast from "react-hot-toast";

interface DashboardSidebarContentProps {
  navItems: NavItem[];
  user: UserInfo;
  onItemClick?: () => void;
}

export function DashboardSidebarContent({ 
  navItems, 
  user,
  onItemClick 
}: DashboardSidebarContentProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.removeItem("userRole");
    toast.success("Logged out successfully");
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/login";
  };

  const getPortalLabel = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Admin Portal";
      case "TEACHER":
        return "Faculty Portal";
      default:
        return "Parent Portal";
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-slate-700 border-r border-slate-200">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
          <School className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 text-base tracking-tight">School Central</span>
            <Sparkles className="h-3 w-3 text-blue-500" />
          </div>
          <span className="text-[11px] font-medium text-blue-600">{getPortalLabel(user.role)}</span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3.5 py-5 overflow-y-auto space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2.5">
          Main Menu
        </p>

        {navItems.map((item) => {
          const Icon = getIconComponent(item.icon);
          const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && item.href !== "/teacher/dashboard" && item.href !== "/dashboard/overview" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                "group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/25 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
                <span className="truncate">{item.title}</span>
              </div>

              {item.badge && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-[10px] px-1.5 py-0 h-4 border-none font-bold",
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>

      {/* User Footer Profile Card */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2.5 truncate">
            <Avatar className="h-8 w-8 ring-1 ring-slate-200">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-blue-600 text-white font-semibold text-xs">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate text-left">
              <span className="text-xs font-semibold text-slate-900 truncate">{user.name}</span>
              <span className="text-[10px] text-slate-500 truncate">{user.email}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
