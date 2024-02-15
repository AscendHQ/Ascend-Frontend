/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [isCollapsed, setIsCollapsed] = React.useState(collapse);

  React.useEffect(() => {
    setIsCollapsed(collapse);
  }, [collapse]);

  // Toggle function for manual collapse/expand action
  const handleToggle = () => {
    console.log(isCollapsed, "isCollapsed");

    setIsCollapsed(prev => !prev);
  };
  return (
    <div className="w-full">
      <button
        className="flex justify-between items-center w-full"
        // onClick={() => setCollapse(prev => !prev)}
        onClick={() => handleToggle()}
      >
        <div className="flex items-center gap-4 py-3 px-4">
          <Icon
            icon="ph:cube"
            fontSize={30}
            className="text-Text-high-emphasis"
          />
          <h4 className="text-base text-Text-high-emphasis">{heading}</h4>
        </div>

        <Icon
          icon="mdi:chevron-down"
          fontSize={27}
          rotate={isCollapsed ? 0 : 90}
        />
      </button>
      <div
        className={`pl-10 overflow-hidden transition-all duration-500 ml-8 before:w-[1px] before:h-[90%] before:top-0 before:left-0 before:bg-Text-meduim-emphasis before:absolute relative ${
          isCollapsed ? "h-0 hidden" : "h-auto"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
