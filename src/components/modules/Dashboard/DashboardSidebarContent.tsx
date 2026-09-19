"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/src/lib/navitems.config";
import { UserInfo } from "@/src/types/user.interface";
import { getIconComponent } from "@/src/lib/icon-mapper";
import { Badge } from "@/src/components/ui/badge";
import { School, Sparkles, ExternalLink } from "lucide-react";
import { cn } from "@/src/lib/utils";

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
      <div className="p-5 border-b border-slate-100 flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20 shrink-0">
          <School className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 text-lg tracking-tight">School Central</span>
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          </div>
          <span className="text-xs font-semibold text-blue-600">{getPortalLabel(user.role)}</span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3.5 py-5 overflow-y-auto space-y-1.5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-3">
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
                "group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/25 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <div className="flex items-center gap-3.5 truncate">
                <Icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
                <span className="truncate">{item.title}</span>
              </div>

              {item.badge && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs px-2 py-0.5 border-none font-bold",
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

      {/* View Public Website Link */}
      <div className="p-3.5 border-t border-slate-100">
        <Link 
          href="/" 
          className="flex items-center justify-between px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <ExternalLink className="h-4.5 w-4.5 text-slate-400" />
            <span>Visit Website</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Home</span>
        </Link>
      </div>
    </div>
  );
}
