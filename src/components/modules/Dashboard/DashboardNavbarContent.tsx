"use client";

import { UserInfo } from "@/src/types/user.interface";
import { NavItem } from "@/src/lib/navitems.config";
import { UserDropdown } from "./UserDropdown";
import { DashboardMobileSidebar } from "./DashboardMobileSidebar";
import { Input } from "@/src/components/ui/input";
import { Search, Bell } from "lucide-react";

interface DashboardNavbarContentProps {
  user: UserInfo;
  navItems: NavItem[];
}

export function DashboardNavbarContent({ user, navItems }: DashboardNavbarContentProps) {
  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu Trigger + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <DashboardMobileSidebar navItems={navItems} user={user} />

        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            type="search" 
            placeholder="Search students, teachers, classes..." 
            className="w-full pl-9 bg-slate-50 border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 rounded-xl focus-visible:ring-blue-500/30 h-9"
          />
        </div>
      </div>

      {/* Right: Notifications + User Profile Dropdown */}
      <div className="flex items-center gap-2.5">
        <button 
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/80 cursor-pointer"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

        <UserDropdown user={user} />
      </div>
    </header>
  );
}
