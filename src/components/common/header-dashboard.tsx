import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ACCOUNT_SETTING_DETAILS } from "@/config/links";

export default function DashboardHeader() {
  const [accountDropDown, setAccountDropDown] = React.useState(false);
  const [notificationDropDown, setNotificationDropDown] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("All");

  const handleTabClick = (tabId: React.SetStateAction<string>): void => {
    setActiveTab(tabId);
  };

  return (
    <header className="flex justify-between max-h-[80px] bg-white items-center p-10 relative">
      <h2 className="text-Text-high-emphasis text-2xl font-bold tracking-tight">
        Overview
      </h2>
      <div className="flex items-center gap-10">
        <button onClick={() => setNotificationDropDown(prev => !prev)}>
          <Icon
            icon="mi:notification"
            fontSize={23}
            className="text-gray-800"
          />
        </button>
        <button
          className="flex items-center gap-3"
          onClick={() => setAccountDropDown(prev => !prev)}
        >
          <Image
            src="/joebrendan.png"
            alt="unsplashh image as avatar"
            width={35}
            height={40}
          />
          <p className="text-Text-high-emphasis text-lg font-medium tracking-tight">
            Blessing Okowah
          </p>
          <Icon icon="tabler:chevron-down" fontSize={22} />
        </button>
        <AccountDropDownSection dropDown={accountDropDown} />
        <NotificationDropDownSection
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          dropDown={notificationDropDown}
        />
      </div>
    </header>
  );
}
function NotificationDropDownSection({
  activeTab,
  handleTabClick,
  dropDown,
}: {
  activeTab: string;
  handleTabClick: (tabId: React.SetStateAction<string>) => void;
  dropDown: boolean;
}) {
  const checkActiveTabContainer = (route: string) =>
    activeTab === route ? "border-grey-1000" : "border-transparent";

  const checkActiveTabCounter = (route: string) =>
    activeTab === route
      ? "bg-info-main text-white"
      : "bg-grey-200 text-Text-meduim-emphasis";
  return (
    <section
      className={`absolute ${
        dropDown ? "block" : "hidden"
      } bg-white top-[115%] right-64 rounded-2xl min-w-[500px] shadow-xl z-50`}
    >
      <Icon
        icon="teenyicons:up-solid"
        className="absolute right-10 -top-4 text-white"
        fontSize={23}
      />
      <div className="flex justify-between px-6 pb-4 pt-6">
        <h4 className="font-bold text-Text-high-emphasis text-2xl">
          Notifications
        </h4>
        <button className="text-Text-high-emphasis text-sm font-medium">
          Mark all as read
        </button>
      </div>
      <div className="mb-4 border-b border-gray-200">
        <ul
          className="flex flex-wrap -mb-px text-sm px-6 font-medium text-center"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className={`flex gap-2 p-2 text-Text-high-emphasis items-center border-b-2 rounded-t-lg ${checkActiveTabContainer(
                "All"
              )}`}
              id="All-tab"
              type="button"
              role="tab"
              aria-controls="All"
              aria-selected={activeTab === "All"}
              onClick={() => handleTabClick("All")}
            >
              All
              <span
                className={`${checkActiveTabCounter(
                  "All"
                )} text-sm font-medium mr-2 px-2 py-1 rounded`}
              >
                {" "}
                10
              </span>
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`flex gap-2 p-2 text-Text-high-emphasis items-center border-b-2 rounded-t-lg ${checkActiveTabContainer(
                "Unread"
              )}`}
              id="Unread-tab"
              type="button"
              role="tab"
              aria-controls="Unread"
              aria-selected={activeTab === "Unread"}
              onClick={() => handleTabClick("Unread")}
            >
              Unread
              <span
                className={`${checkActiveTabCounter(
                  "Unread"
                )} text-sm font-medium mr-2 px-2 py-1 rounded`}
              >
                8
              </span>
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`flex gap-2 p-2 text-Text-high-emphasis items-center border-b-2 rounded-t-lg ${checkActiveTabContainer(
                "Read"
              )}`}
              id="Read-tab"
              type="button"
              role="tab"
              aria-controls="Read"
              aria-selected={activeTab === "Read"}
              onClick={() => handleTabClick("Read")}
            >
              Read
              <span
                className={`${checkActiveTabCounter(
                  "Read"
                )} text-sm font-medium mr-2 px-2 py-1 rounded`}
              >
                2
              </span>
            </button>
          </li>
        </ul>

        <div id="myTabContent">
          <div
            className={`bg-gray-50  ${activeTab === "All" ? "" : "hidden"}`}
            role="tabpanel"
            aria-labelledby="All-tab"
          >
            <ul>
              <li className="flex bg-secondary-mint-green-100 items-start gap-2 py-2 px-6 border-b border-border-colour-light">
                <Image
                  src="/joebrendan.png"
                  alt="unsplashh image as avatar"
                  width={35}
                  height={40}
                />
                <div className="space-y-2">
                  <h5 className="text-sm">
                    <span className="font-medium uppercase">
                      Ernest Francis
                    </span>{" "}
                    is requesting permission to edit results.
                  </h5>
                  <div className="flex text-xs gap-2 text-Text-meduim-emphasis font-bold">
                    <span>2 mins ago</span>
                    <span>@Admin @Bursary</span>
                  </div>
                  {/* <div className="flex gap-2">
                    <button className="font-semibold text-sm bg-primary-purple-500 rounded-md py-2 px-4 text-white">
                      Accept
                    </button>
                    <button className="font-semibold text-sm bg-white rounded-md py-2 px-4 text-Text-high-emphasis border-2 border-border-colour-light">
                      Decline
                    </button>
                  </div> */}
                </div>
              </li>
              <li className="flex bg-secondary-mint-green-100 items-start gap-2 py-2 px-6 border-b border-border-colour-light">
                <Image
                  src="/joebrendan.png"
                  alt="unsplashh image as avatar"
                  width={35}
                  height={40}
                />
                <div className="space-y-2">
                  <h5 className="text-sm">
                    <span className="font-medium">BLESSING OKOWAH</span> is
                    requesting permission to edit results.
                  </h5>
                  <div className="flex text-xs gap-2 text-Text-meduim-emphasis font-bold">
                    <span>2 mins ago</span>
                    <span>@Admin @Bursary</span>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2 py-2 px-6 border-b border-border-colour-light">
                <Image
                  src="/joebrendan.png"
                  alt="unsplashh image as avatar"
                  width={35}
                  height={40}
                />
                <div className="space-y-2">
                  <h5 className="text-sm">
                    <span className="font-medium uppercase">Mike Carlson</span>{" "}
                    is requesting permission to edit results.
                  </h5>
                  <div className="flex text-xs gap-2 text-Text-meduim-emphasis font-bold">
                    <span>2 mins ago</span>
                    <span>@Admin @Bursary</span>
                  </div>
                  {/* <div className="flex gap-2">
                    <button className="font-semibold text-sm bg-primary-purple-500 rounded-md py-2 px-4 text-white">
                      Accept
                    </button>
                    <button className="font-semibold text-sm bg-white rounded-md py-2 px-4 text-Text-high-emphasis border-2 border-border-colour-light">
                      Decline
                    </button>
                  </div> */}
                </div>
              </li>
              <li className="flex items-start gap-2 py-2 px-6 border-b border-border-colour-light">
                <Image
                  src="/joebrendan.png"
                  alt="unsplashh image as avatar"
                  width={35}
                  height={40}
                />
                <div className="space-y-2">
                  <h5 className="text-sm">
                    <span className="font-medium uppercase">Leonard Perry</span>{" "}
                    is requesting permission to edit results.
                  </h5>
                  <div className="flex text-xs gap-2 text-Text-meduim-emphasis font-bold">
                    <span>2 mins ago</span>
                    <span>@Admin @Bursary</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div
            className={`bg-gray-50  ${activeTab === "Unread" ? "" : "hidden"}`}
            role="tabpanel"
            aria-labelledby="Unread-tab"
          >
            <ul>
              <li className="flex bg-secondary-mint-green-100 items-start gap-2 py-2 px-6 border-b border-border-colour-light">
                <Image
                  src="/joebrendan.png"
                  alt="unsplashh image as avatar"
                  width={35}
                  height={40}
                />
                <div className="space-y-2">
                  <h5 className="text-sm">
                    <span className="font-medium uppercase">Stella Kelley</span>{" "}
                    is requesting permission to edit results.
                  </h5>
                  <div className="flex text-xs gap-2 text-Text-meduim-emphasis font-bold">
                    <span>2 mins ago</span>
                    <span>@Admin @Bursary</span>
                  </div>
                  {/* <div className="flex gap-2">
                    <button className="font-semibold text-sm bg-primary-purple-500 rounded-md py-2 px-4 text-white">
                      Accept
                    </button>
                    <button className="font-semibold text-sm bg-white rounded-md py-2 px-4 text-Text-high-emphasis border-2 border-border-colour-light">
                      Decline
                    </button>
                  </div> */}
                </div>
              </li>
              <li className="flex bg-secondary-mint-green-100 items-start gap-2 py-2 px-6 border-b border-border-colour-light">
                <Image
                  src="/joebrendan.png"
                  alt="unsplashh image as avatar"
                  width={35}
                  height={40}
                />
                <div className="space-y-2">
                  <h5 className="text-sm">
                    <span className="font-medium uppercase">Lula Tran</span> is
                    requesting permission to edit results.
                  </h5>
                  <div className="flex text-xs gap-2 text-Text-meduim-emphasis font-bold">
                    <span>2 mins ago</span>
                    <span>@Admin @Bursary</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div
            className={` bg-gray-50  ${activeTab === "Read" ? "" : "hidden"}`}
            role="tabpanel"
            aria-labelledby="Read-tab"
          >
            <ul>
              <li className="flex items-start gap-2 py-2 px-6 border-b border-border-colour-light">
                <Image
                  src="/joebrendan.png"
                  alt="unsplashh image as avatar"
                  width={35}
                  height={40}
                />
                <div className="space-y-2">
                  <h5 className="text-sm">
                    <span className="font-medium uppercase">Nettie Cross</span>{" "}
                    is requesting permission to edit results.
                  </h5>
                  <div className="flex text-xs gap-2 text-Text-meduim-emphasis font-bold">
                    <span>2 mins ago</span>
                    <span>@Admin @Bursary</span>
                  </div>
                  {/* <div className="flex gap-2">
                    <button className="font-semibold text-sm bg-primary-purple-500 rounded-md py-2 px-4 text-white">
                      Accept
                    </button>
                    <button className="font-semibold text-sm bg-white rounded-md py-2 px-4 text-Text-high-emphasis border-2 border-border-colour-light">
                      Decline
                    </button>
                  </div> */}
                </div>
              </li>
              <li className="flex items-start gap-2 py-2 px-6 border-b border-border-colour-light">
                <Image
                  src="/joebrendan.png"
                  alt="unsplashh image as avatar"
                  width={35}
                  height={40}
                />
                <div className="space-y-2">
                  <h5 className="text-sm">
                    <span className="font-medium uppercase">
                      Clara Alexander
                    </span>{" "}
                    is requesting permission to edit results.
                  </h5>
                  <div className="flex text-xs gap-2 text-Text-meduim-emphasis font-bold">
                    <span>2 mins ago</span>
                    <span>@Admin @Bursary</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccountDropDownSection({ dropDown }: { dropDown: boolean }) {
  return (
    <section
      className={`absolute bg-white top-full right-10 p-4 flex flex-col items-center justify-center rounded-md shadow-lg transition-all origin-top duration-500 z-50 ${
        dropDown ? "block" : "hidden"
      }`}
    >
      <Image
        src="/joebrendan.png"
        alt="unsplashh image as avatar"
        width={50}
        height={60}
      />
      <p className="text-Text-high-emphasis text-lg font-medium tracking-tight">
        Blessing Okowah
      </p>
      <span className="text-sm text-gray-800 px-5">
        blessingokowah@gmail.com
      </span>
      <ul className="w-full py-3 space-y-1">
        <li>
          <Link
            href={ACCOUNT_SETTING_DETAILS}
            className="flex w-full gap-2 hover:bg-primary-purple-200 hover:text-Text-high-emphasis text-gray-800 py-2 px-3 transition-all duration-700 rounded-md items-center"
          >
            <Icon icon="ep:setting" fontSize={20} />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <button className="flex w-full gap-2 hover:bg-primary-purple-200 hover:text-Text-high-emphasis text-gray-800 py-2 px-3 transition-all duration-700 rounded-md items-center">
            <Icon icon="solar:logout-linear" fontSize={20} />
            <span>Log out</span>
          </button>
        </li>
      </ul>
    </section>
  );
}
