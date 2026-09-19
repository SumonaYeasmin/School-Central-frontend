import { getUserInfo } from "@/src/services/auth/getUserInfo";
import { getNavItemsByRole } from "@/src/lib/navitems.config";
import { DashboardNavbarContent } from "./DashboardNavbarContent";

export async function DashboardNavbar() {
  const user = await getUserInfo();
  const userRole = user?.role || "ADMIN";
  const navItems = getNavItemsByRole(userRole);

  return <DashboardNavbarContent user={user} navItems={navItems} />;
}
