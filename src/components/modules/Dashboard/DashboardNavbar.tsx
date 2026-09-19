import { getUserInfo } from "@/src/services/auth/getUserInfo";
import { getNavItemsByRole } from "@/src/lib/navitems.config";
import { DashboardNavbarContent } from "./DashboardNavbarContent";

export async function DashboardNavbar() {
  const user = await getUserInfo();
  const navItems = getNavItemsByRole(user.role);

  return <DashboardNavbarContent user={user} navItems={navItems} />;
}
