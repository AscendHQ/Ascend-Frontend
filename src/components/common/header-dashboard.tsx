import { Icon } from "@iconify/react";
import React from "react";

export default function DashboardHeader() {
  return (
    <header className="flex justify-between max-h-[80px] bg-white items-center p-10">
      <h2 className="text-Text-high-emphasis text-2xl font-bold tracking-tight">
        Overview
      </h2>
      <div className="flex items-center gap-10">
        <button>
          <Icon
            icon="mi:notification"
            fontSize={28}
            className="text-Text-meduim-emphasis"
          />
        </button>
        <button className="flex items-center gap-3">
          <p className="text-Text-high-emphasis">Blessing Okowah</p>
          <Icon icon="tabler:chevron-down" fontSize={22} />
        </button>
      </div>
    </header>
  );
}
