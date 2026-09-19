import { getUserInfo } from "@/src/services/auth/getUserInfo";
import { getNavItemsByRole } from "@/src/lib/navitems.config";
import { DashboardSidebarContent } from "./DashboardSidebarContent";

export async function DashboardSidebar() {
  const user = await getUserInfo();
  const userRole = user?.role || "ADMIN";
  const navItems = getNavItemsByRole(userRole);

  return (
    <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-40">
      <DashboardSidebarContent navItems={navItems} user={user} />
    </aside>
  );
}
