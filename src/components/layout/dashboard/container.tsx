import React from "react";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";

type Props = {
  children: JSX.Element;
  headerTitle: string;
};

export default function Container({ children, headerTitle }: Props) {
  return (
    <div className="grid font-inter grid-cols-9 min-w-[950px]">
      <Sidebar />
      <div className="col-[3/-1] 3xl:col-[2/-1] bg-neutral-300">
        <DashboardHeader headerTitle={headerTitle} />
        {children}
      </div>
    </div>
  );
}
