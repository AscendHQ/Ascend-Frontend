import React from "react";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";

type Props = {
  children: JSX.Element;
};

export default function Container({ children }: Props) {
  return (
    <div className="grid font-inter grid-cols-9">
      <Sidebar />
      <div className="col-[3/-1] 3xl:col-[2/-1] bg-neutral-300">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
