import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import databaseNavSection from "@/config/databaseNavSection";
import { adminSidebarItems, mainSidebarItems } from "@/config/sidebarItems";

import SideBarItem from "./sidebar-item";
import SidebarMenu from "./sidebar-menu";

export default function Sidebar() {
  const router = useRouter();

  const [showCollapsibleSideNav, setshowCollapsibleSideNav] =
    React.useState(false);

  return (
    <aside className="col-span-2 4xl:col-span-1 border-r border-neutral-200 py-6 px-4 bg-white relative">
      <Image
        src="/Ascend-Logo.svg"
        alt="Ascend Logo"
        width={100}
        height={24}
        priority
        className="relative z-50 mt-3"
      />
      <div className="mt-16 pb-4 border-b border-neutral-200 space-y-2">
        <h3 className="text-base mb-4 text-gray-800">MAIN</h3>
        {mainSidebarItems.map(item => {
          if (item.isDatabaseNav) {
            return (
              <SidebarMenu
                heading={"Database"}
                key={"OMYRTSy"}
                collapse={Boolean(
                  !databaseNavSection.find(each =>
                    each.isActivepath.some(path => router.pathname === path)
                  )
                )}
                collapseAction={showCollapsibleSideNav}
                setCollapse={setshowCollapsibleSideNav}
              >
                {databaseNavSection.map(each => (
                  <SideBarItem
                    title={each.title}
                    isActive={each.isActivepath.some(
                      path => router.pathname === path
                    )}
                    urlPath={each.path}
                    isSideBarMenu
                    key={each.title}
                  />
                ))}
              </SidebarMenu>
            );
          } else {
            return (
              <SideBarItem
                key={item.title}
                title={item.title}
                icon={item.icon}
                isActive={item.isActivePaths.some(
                  path => router.pathname === path
                )}
                urlPath={item.urlPath}
              />
            );
          }
        })}
      </div>
      <div className="mt-10 mb-5 pb-4 border-b border-neutral-200 space-y-2">
        <h3 className="text-base mb-4 text-gray-800">ADMINISTRATION</h3>
        {adminSidebarItems.map(item => (
          <SideBarItem
            title={item.title}
            icon={item.icon}
            key={item.title}
            isActive={item.isActivePaths.some(path => router.pathname === path)}
            urlPath={item.urlPath}
          />
        ))}
      </div>
      <span className="text-primary-purple-600">©product of Ascend</span>
    </aside>
  );
}
