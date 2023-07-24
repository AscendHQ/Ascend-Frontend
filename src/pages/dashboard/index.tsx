import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-[100vh] font-inter">
      <Sidebar />
      <div className="flex-1">
        <DashboardHeader />
      </div>
    </div>
  );
}
