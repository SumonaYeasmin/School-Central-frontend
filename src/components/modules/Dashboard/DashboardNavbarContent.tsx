"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserInfo, UserRole } from "@/src/types/user.interface";
import { NavItem, getNavItemsByRole } from "@/src/lib/navitems.config";
import { mockUsers } from "@/src/services/auth/getUserInfo";
import { UserDropdown } from "./UserDropdown";
import { DashboardMobileSidebar } from "./DashboardMobileSidebar";
import { Input } from "@/src/components/ui/input";
import { Search, Bell } from "lucide-react";

interface DashboardNavbarContentProps {
  user: UserInfo;
  navItems: NavItem[];
}

export function DashboardNavbarContent({ user, navItems: initialNavItems }: DashboardNavbarContentProps) {
  const pathname = usePathname();

  // Dynamically resolve active portal and user from URL path
  const activeRole: UserRole = pathname.startsWith("/teacher")
    ? "TEACHER"
    : pathname.startsWith("/admin")
    ? "ADMIN"
    : pathname.startsWith("/dashboard")
    ? "PARENT"
    : user.role;

  const fallbackUser = mockUsers[activeRole] || user;
  const [activeUser, setActiveUser] = useState<UserInfo>(fallbackUser);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setActiveUser({
            ...fallbackUser,
            name: parsed.name || fallbackUser.name,
            email: parsed.email || fallbackUser.email,
            role: activeRole,
          });
          return;
        }
      }
    } catch {}
    setActiveUser(fallbackUser);
  }, [activeRole]);

  const activeNavItems = getNavItemsByRole(activeRole) || initialNavItems;

  return (
    <header className="sticky top-0 z-30 h-14 sm:h-16 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu Trigger + Search Bar */}
      <div className="flex items-center gap-3.5 flex-1 max-w-lg">
        <DashboardMobileSidebar navItems={activeNavItems} user={activeUser} />

        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
          <Input 
            type="search" 
            placeholder="Search students, teachers, classes..." 
            className="w-full pl-10 bg-slate-50 border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 rounded-xl focus-visible:ring-blue-500/30 h-10 shadow-2xs"
          />
        </div>
      </div>

      {/* Right: Notifications + User Profile Dropdown */}
      <div className="flex items-center gap-3">
        <button 
          className="relative p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/80 cursor-pointer"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

        <UserDropdown user={activeUser} />
      </div>
    </header>
  );
}
