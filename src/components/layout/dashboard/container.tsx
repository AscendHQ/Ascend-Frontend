import React from "react";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";

type Props = {
  children: JSX.Element;
};

export default function Container({ children }: Props) {
  return (
    <div className="flex font-inter">
      <Sidebar />
      <div className="flex-1 bg-neutral-300">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
