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
    id: "teacher-01",
    name: "Rafiqul Islam",
    email: "rafiqul.islam@schoolcentral.edu",
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
 * Auto-detects by passed role or defaults to fallback mock user.
 */
export async function getUserInfo(role?: UserRole): Promise<UserInfo> {
  if (role && mockUsers[role]) return mockUsers[role];
  return mockUsers[DEFAULT_FALLBACK_ROLE] || mockUsers.ADMIN;
}
