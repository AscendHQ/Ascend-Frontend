import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import databaseNavSection from "@/config/databaseNavSection";
import {
  NEW_SCHOOL,
  PLATFORM_METRICS,
  PLATFORM_SCHOOLS,
} from "@/config/links";
import { adminSidebarItems, mainSidebarItems } from "@/config/sidebarItems";
import useIsAscendOwner from "@/hooks/use-is-ascend-owner";

import SideBarItem from "./sidebar-item";
import SidebarMenu from "./sidebar-menu";

export default function Sidebar() {
  const router = useRouter();
  const { isReady, isAscendOwner } = useIsAscendOwner();

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
      {isReady && (
        <SchoolNavigation
          pathname={router.pathname}
          showCollapsibleSideNav={showCollapsibleSideNav}
          setshowCollapsibleSideNav={setshowCollapsibleSideNav}
        />
      )}
      {isReady && isAscendOwner && (
        <MetricsNavigation pathname={router.pathname} />
      )}
      <span className="text-primary-purple-600">©product of Ascend</span>
    </aside>
  );
}

function MetricsNavigation({ pathname }: { pathname: string }) {
  const items = [
    {
      title: "Platform Overview",
      icon: "material-symbols:monitoring-outline-rounded",
      urlPath: PLATFORM_METRICS,
    },
    {
      title: "Schools",
      icon: "material-symbols:domain-outline-rounded",
      urlPath: PLATFORM_SCHOOLS,
    },
    {
      title: "Add School",
      icon: "material-symbols:add-business-outline-rounded",
      urlPath: NEW_SCHOOL,
    },
  ];

  return (
    <div className="mb-5 mt-10 space-y-2 border-b border-neutral-200 pb-6">
      <h3 className="mb-4 text-base text-gray-800">METRICS</h3>
      {items.map(item => (
        <SideBarItem
          key={item.title}
          title={item.title}
          icon={item.icon}
          isActive={pathname === item.urlPath}
          urlPath={item.urlPath}
        />
      ))}
    </div>
  );
}

function SchoolNavigation({
  pathname,
  showCollapsibleSideNav,
  setshowCollapsibleSideNav,
}: {
  pathname: string;
  showCollapsibleSideNav: boolean;
  setshowCollapsibleSideNav: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="mt-16 pb-4 border-b border-neutral-200 space-y-2">
        <h3 className="text-base mb-4 text-gray-800">MAIN</h3>
        {mainSidebarItems.map(item => {
          if (item.isDatabaseNav) {
            return (
              <SidebarMenu
                heading={"Database"}
                key={item.title}
                collapse={Boolean(
                  !databaseNavSection.find(each =>
                    each.isActivepath.some(path => pathname === path)
                  )
                )}
                collapseAction={showCollapsibleSideNav}
                setCollapse={setshowCollapsibleSideNav}
              >
                {databaseNavSection.map(each => (
                  <SideBarItem
                    title={each.title}
                    isActive={each.isActivepath.some(
                      path => pathname === path
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
                  path => pathname === path
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
            isActive={item.isActivePaths.some(path => pathname === path)}
            urlPath={item.urlPath}
          />
        ))}
      </div>
    </>
  );
}
