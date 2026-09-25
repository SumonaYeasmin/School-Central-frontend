import { api } from "@/src/lib/api";

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "TEACHER" | "PARENT";
    teacherId?: string;
    phone?: string;
    children?: any[];
  };
}

export const loginUser = async (credentials: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", credentials);
  const data: AuthResponse = response.data;

  if (data?.accessToken) {
    // Save access token and userRole to cookies for Next.js Middleware route guarding
    document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    document.cookie = `userRole=${data.user.role}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    localStorage.setItem("userRole", data.user.role);
    localStorage.setItem("userInfo", JSON.stringify(data.user));
  }

  return data;
};

export const logoutUser = () => {
  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  localStorage.removeItem("userRole");
  localStorage.removeItem("userInfo");
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.href = "/login";
};
