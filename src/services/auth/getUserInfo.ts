import { UserInfo, UserRole } from "@/src/types/user.interface";

// Default fallback role for development / unauthenticated state
const DEFAULT_FALLBACK_ROLE: UserRole = "ADMIN";

export const mockUsers: Record<UserRole, UserInfo> = {
  ADMIN: {
    id: "admin-01",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@schoolcentral.edu",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  TEACHER: {
    id: "TCH-2026-819",
    name: "Akash",
    email: "akash@gmail.com",
    role: "TEACHER",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  PARENT: {
    id: "parent-01",
    name: "Kamal Hossain",
    email: "kamal.hossain@gmail.com",
    role: "PARENT",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
};

/**
 * Get current user info.
 * Auto-detects by stored user session or passed role or defaults to fallback mock user.
 */
export async function getUserInfo(role?: UserRole): Promise<UserInfo> {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          const userRole = (parsed.role as UserRole) || role || DEFAULT_FALLBACK_ROLE;
          return {
            id: parsed.id || "user-01",
            name: parsed.name || "User",
            email: parsed.email,
            role: userRole,
            avatar: parsed.avatar || mockUsers[userRole]?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
            phone: parsed.phone,
          };
        }
      }
    } catch {
      // fallback to mock
    }
  }

  if (role && mockUsers[role]) return mockUsers[role];
  return mockUsers[DEFAULT_FALLBACK_ROLE] || mockUsers.ADMIN;
}
