import { DashboardSidebar } from "@/src/components/modules/Dashboard/DashboardSidebar";
import { DashboardNavbar } from "@/src/components/modules/Dashboard/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/90 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Sticky Desktop Sidebar */}
      <DashboardSidebar />

      {/* 2. Main Content Area with Header */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
