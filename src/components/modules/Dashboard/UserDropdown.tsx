"use client";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/src/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { UserInfo } from "@/src/types/user.interface";
import { LogOut, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

interface UserDropdownProps {
  user: UserInfo;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const handleLogout = () => {
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.removeItem("userRole");
    toast.success("Logged out successfully");
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/login";
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "TEACHER":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 p-1.5 px-2.5 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 focus:outline-none cursor-pointer">
          <Avatar className="h-9 w-9 ring-2 ring-blue-500/20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-blue-600 text-white font-semibold text-sm">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-sm font-semibold text-slate-800 leading-none">{user.name}</span>
            <span className="text-xs text-slate-500 mt-1 font-medium">{user.role}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 bg-white border-slate-200 text-slate-700 p-2.5 shadow-xl shadow-slate-200/50">
        {/* User Info Header */}
        <DropdownMenuLabel className="font-normal px-2.5 py-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-slate-900 leading-none truncate">{user.name}</p>
              <Badge variant="outline" className={`text-xs px-2 py-0.5 uppercase font-semibold ${getRoleBadgeVariant(user.role)}`}>
                {user.role}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 leading-none truncate mt-0.5">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-100 my-1.5" />

        {/* Direct Logout Action */}
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer hover:bg-rose-50 text-rose-600 focus:bg-rose-50 focus:text-rose-600 rounded-lg text-sm py-2.5 flex items-center gap-3 font-medium"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
