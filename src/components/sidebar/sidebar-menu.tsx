import { Icon } from "@iconify/react";
import React, { ReactNode } from "react";

type ISidebarMenu = {
  heading: string;
  children: ReactNode;
  collapse: boolean;
  collapseAction: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SidebarMenu({
  heading,
  children,
  collapse,
  collapseAction,
  setCollapse,
}: ISidebarMenu) {
  React.useEffect(() => {
    setCollapse(collapse);
  }, [collapse, setCollapse]);

  return (
    <div className="w-full">
      <button
        className="flex justify-between items-center w-full"
        onClick={() => setCollapse(prev => !prev)}
      >
        <div className="flex items-center gap-4 py-3 px-5">
          <Icon
            icon="ph:cube"
            fontSize={30}
            className="text-Text-meduim-emphasis"
          />
          <h4 className="text-lg text-Text-meduim-emphasis">{heading}</h4>
        </div>

        <Icon
          icon="mdi:chevron-down"
          fontSize={27}
          rotate={collapseAction ? 0 : 90}
        />
      </button>
      <div
        className={`pl-10 overflow-hidden transition-all duration-500 ml-9 before:w-[2px] before:h-[90%] before:top-0 before:left-0 before:bg-Text-meduim-emphasis before:absolute relative ${
          collapseAction ? "h-0 hidden" : "h-auto"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
