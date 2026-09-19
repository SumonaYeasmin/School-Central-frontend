import { UserRole } from "@/src/types/user.interface";

export interface NavItem {
  title: string;
  href: string;
  icon: string; // Lucide icon name string e.g. "LayoutDashboard", "School", etc.
  badge?: string | number;
  roles: UserRole[];
}

export const navItemsConfig: NavItem[] = [
  // --- Admin Navigation Items ---
  {
    title: "Overview",
    href: "/admin/dashboard",
    icon: "LayoutDashboard",
    roles: ["ADMIN"],
  },
  {
    title: "Classes & Sections",
    href: "/admin/dashboard/classes",
    icon: "School",
    badge: "12",
    roles: ["ADMIN"],
  },
  {
    title: "Subjects",
    href: "/admin/dashboard/subjects",
    icon: "BookOpen",
    roles: ["ADMIN"],
  },
  {
    title: "Teachers",
    href: "/admin/dashboard/teachers",
    icon: "Users",
    badge: "48",
    roles: ["ADMIN"],
  },
  {
    title: "Students",
    href: "/admin/dashboard/students",
    icon: "GraduationCap",
    badge: "1.2k",
    roles: ["ADMIN"],
  },
  {
    title: "Class Routines",
    href: "/admin/dashboard/routines",
    icon: "Clock",
    roles: ["ADMIN"],
  },
  {
    title: "Settings",
    href: "/admin/dashboard/profile-settings",
    icon: "UserCog",
    roles: ["ADMIN"],
  },

  // --- Teacher Navigation Items ---
  {
    title: "Overview",
    href: "/teacher/dashboard",
    icon: "LayoutDashboard",
    roles: ["TEACHER"],
  },
  {
    title: "My Classes",
    href: "/teacher/dashboard/classes",
    icon: "School",
    roles: ["TEACHER"],
  },
  {
    title: "Weekly Routine",
    href: "/teacher/dashboard/routines",
    icon: "Clock",
    roles: ["TEACHER"],
  },
  {
    title: "Attendance",
    href: "/teacher/dashboard/attendance",
    icon: "ClipboardList",
    roles: ["TEACHER"],
  },
  {
    title: "Settings",
    href: "/teacher/dashboard/profile-settings",
    icon: "UserCog",
    roles: ["TEACHER"],
  },

  // --- Parent Navigation Items ---
  {
    title: "Overview",
    href: "/dashboard/overview",
    icon: "LayoutDashboard",
    roles: ["PARENT"],
  },
  {
    title: "My Children",
    href: "/dashboard/children",
    icon: "GraduationCap",
    roles: ["PARENT"],
  },
  {
    title: "Class Routine",
    href: "/dashboard/routines",
    icon: "CalendarDays",
    roles: ["PARENT"],
  },
  {
    title: "Attendance Report",
    href: "/dashboard/attendance",
    icon: "ClipboardList",
    roles: ["PARENT"],
  },
  {
    title: "Settings",
    href: "/dashboard/profile-settings",
    icon: "UserCog",
    roles: ["PARENT"],
  },
];

/**
 * Filter and return navigation menu items based on the provided user role
 */
export function getNavItemsByRole(role: UserRole): NavItem[] {
  return navItemsConfig.filter((item) => item.roles.includes(role));
}
