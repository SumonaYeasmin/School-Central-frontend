import { UserRole } from "@/src/types/user.interface";

export interface NavItem {
  title: string;
  href: string;
  icon: string; // Lucide icon name string e.g. "LayoutDashboard", "School", etc.
  badge?: string | number;
  roles: UserRole[];
  category: "MAIN MENU" | "ACADEMIC" | "PEOPLE" | "MANAGEMENT" | "SYSTEM" | string;
}

export const navItemsConfig: NavItem[] = [
  // ==========================================
  // --- ADMIN NAVIGATION ITEMS ---
  // ==========================================
  // 1. MAIN MENU
  {
    title: "Overview",
    href: "/admin/dashboard",
    icon: "LayoutGrid",
    roles: ["ADMIN"],
    category: "MAIN MENU",
  },

  // 2. ACADEMIC
  {
    title: "Classes & Sections",
    href: "/admin/dashboard/classes",
    icon: "School",
    badge: "12",
    roles: ["ADMIN"],
    category: "ACADEMIC",
  },
  {
    title: "Subjects",
    href: "/admin/dashboard/subjects",
    icon: "BookOpen",
    roles: ["ADMIN"],
    category: "ACADEMIC",
  },
  {
    title: "Class Routines",
    href: "/admin/dashboard/routines",
    icon: "Clock",
    roles: ["ADMIN"],
    category: "ACADEMIC",
  },

  // 3. PEOPLE
  {
    title: "Teachers",
    href: "/admin/dashboard/teachers",
    icon: "Users",
    badge: "48",
    roles: ["ADMIN"],
    category: "PEOPLE",
  },
  {
    title: "Students",
    href: "/admin/dashboard/students",
    icon: "GraduationCap",
    badge: "1.2k",
    roles: ["ADMIN"],
    category: "PEOPLE",
  },
  {
    title: "Parents",
    href: "/admin/dashboard/parents",
    icon: "UsersRound",
    roles: ["ADMIN"],
    category: "PEOPLE",
  },

  // 4. MANAGEMENT
  {
    title: "Attendance",
    href: "/admin/dashboard/attendance",
    icon: "ClipboardCheck",
    roles: ["ADMIN"],
    category: "MANAGEMENT",
  },
  {
    title: "Results",
    href: "/admin/dashboard/results",
    icon: "BarChart3",
    roles: ["ADMIN"],
    category: "MANAGEMENT",
  },
  {
    title: "Notices",
    href: "/admin/dashboard/notices",
    icon: "Megaphone",
    roles: ["ADMIN"],
    category: "MANAGEMENT",
  },

  // 5. SYSTEM
  {
    title: "Settings",
    href: "/admin/dashboard/profile-settings",
    icon: "Settings",
    roles: ["ADMIN"],
    category: "SYSTEM",
  },

  // ==========================================
  // --- TEACHER NAVIGATION ITEMS ---
  // ==========================================
  {
    title: "Overview",
    href: "/teacher/dashboard",
    icon: "LayoutDashboard",
    roles: ["TEACHER"],
    category: "MAIN MENU",
  },
  {
    title: "My Classes",
    href: "/teacher/dashboard/classes",
    icon: "School",
    roles: ["TEACHER"],
    category: "ACADEMIC",
  },
  {
    title: "Weekly Routine",
    href: "/teacher/dashboard/routines",
    icon: "Clock",
    roles: ["TEACHER"],
    category: "ACADEMIC",
  },
  {
    title: "Attendance",
    href: "/teacher/dashboard/attendance",
    icon: "ClipboardList",
    roles: ["TEACHER"],
    category: "MANAGEMENT",
  },
  {
    title: "Enter Marks",
    href: "/teacher/dashboard/results/enter-marks",
    icon: "FileSpreadsheet",
    badge: "New",
    roles: ["TEACHER"],
    category: "RESULTS",
  },
  {
    title: "Settings",
    href: "/teacher/dashboard/profile-settings",
    icon: "Settings",
    roles: ["TEACHER"],
    category: "SYSTEM",
  },

  // ==========================================
  // --- PARENT NAVIGATION ITEMS ---
  // ==========================================
  {
    title: "Overview",
    href: "/dashboard/overview",
    icon: "LayoutDashboard",
    roles: ["PARENT"],
    category: "MAIN MENU",
  },
  {
    title: "My Children",
    href: "/dashboard/children",
    icon: "GraduationCap",
    roles: ["PARENT"],
    category: "ACADEMIC",
  },
  {
    title: "Class Routine",
    href: "/dashboard/routines",
    icon: "CalendarDays",
    roles: ["PARENT"],
    category: "ACADEMIC",
  },
  {
    title: "Attendance Report",
    href: "/dashboard/attendance",
    icon: "ClipboardList",
    roles: ["PARENT"],
    category: "MANAGEMENT",
  },
  {
    title: "Settings",
    href: "/dashboard/profile-settings",
    icon: "Settings",
    roles: ["PARENT"],
    category: "SYSTEM",
  },
];

/**
 * Filter and return navigation menu items based on the provided user role
 */
export function getNavItemsByRole(role: UserRole): NavItem[] {
  return navItemsConfig.filter((item) => item.roles.includes(role));
}
