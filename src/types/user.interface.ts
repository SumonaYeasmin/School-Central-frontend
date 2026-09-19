export type UserRole = "ADMIN" | "TEACHER" | "PARENT";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
  createdAt?: string;
}
