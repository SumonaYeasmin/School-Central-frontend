"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { UserInfo, UserRole } from "@/src/types/user.interface";

interface DecodedJwt {
  id?: string;
  sub?: string;
  name?: string;
  email?: string;
  role?: UserRole;
  exp?: number;
}

/**
 * Server Action to retrieve the current user's profile info from secure cookies.
 * Provides fallback mock data for development testing when no token is present.
 */
export async function getUserInfo(): Promise<UserInfo> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      const decoded = jwtDecode<DecodedJwt>(token);
      if (decoded && (decoded.id || decoded.sub)) {
        return {
          id: decoded.id || decoded.sub || "user-1",
          name: decoded.name || "School Administrator",
          email: decoded.email || "admin@schoolcentral.com",
          role: decoded.role || "ADMIN",
        };
      }
    }
  } catch {
    // If decoding fails, fall through to fallback
  }

  // Development Fallback: Return Admin profile so UI is immediately visible
  return {
    id: "admin-dev-01",
    name: "Dr. Sarah Jenkins",
    email: "sarah.jenkins@schoolcentral.edu",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  };
}
