import React from "react";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";

type ContainerProps = {
  children: JSX.Element;
  headerTitle: string;
};

export default function Container({ children, headerTitle }: ContainerProps) {
  return (
    <div className="dashboard-shell min-h-screen overflow-x-hidden font-inter lg:grid lg:grid-cols-9">
      <Sidebar />
      <main className="min-w-0 lg:col-[3/-1] 4xl:col-[2/-1]">
        <DashboardHeader headerTitle={headerTitle} />
        {children}
      </main>
    </div>
  );
}
