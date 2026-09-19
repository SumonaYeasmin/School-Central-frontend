"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { DashboardSidebarContent } from "./DashboardSidebarContent";
import { NavItem } from "@/src/lib/navitems.config";
import { UserInfo } from "@/src/types/user.interface";
import { Menu } from "lucide-react";

interface DashboardMobileSidebarProps {
  navItems: NavItem[];
  user: UserInfo;
}

export function DashboardMobileSidebar({ navItems, user }: DashboardMobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button 
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 w-72 border-r border-slate-200 bg-white text-slate-800">
        <DashboardSidebarContent
          navItems={navItems}
          user={user}
          onItemClick={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
