import { Icon } from "@iconify/react";
import { MenuProps, Modal } from "antd";
import { Dropdown } from "antd";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { roleInfo } from "@/config/dummyInfo";

export default function Roles() {
  const [openAddNewRole, setOpenAddNewRole] = React.useState(false);
  const [openRoleDetail, setOpenRoleDetail] = React.useState(false);
  const [editRoleDetail, setEditRoleDetail] = React.useState(false);

  return (
    <Container headerTitle="Roles">
      <main className="px-10 py-5 relative h-full bg-white">
        <Modal
          title={<h2 className="text-lg font-semibold">Add new role</h2>}
          centered
          open={openAddNewRole}
          onOk={() => setOpenAddNewRole(false)}
          onCancel={() => setOpenAddNewRole(false)}
          maskClosable={false}
          width={480}
          okText={"Add Role"}
          okButtonProps={{
            style: {
              color: "#ffffff",
              minHeight: "48px",
              backgroundColor: "#7864ff",
              width: "100%",
              marginLeft: "0px",
            },
          }}
          cancelButtonProps={{
            style: {
              display: "none",
            },
          }}
        >
          <section className="">
            <div className="mt-4 space-y-2">
              <div>
                <label
                  htmlFor="role_name"
                  className="block mb-2 text-sm font-semibold text-Text-high-emphasis"
                >
                  Role name
                </label>
                <input
                  type="text"
                  id="role_name"
                  className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
                  placeholder="Enter role name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="role_description"
                  className="block mb-2 text-sm font-semibold text-Text-high-emphasis"
                >
                  Role Description
                </label>
                <textarea
                  className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28"
                  id="role_description"
                  placeholder="What is this role about."
                />
                <span className="text-sm">0/40 characters remaining</span>
              </div>
            </div>
          </section>
        </Modal>
        <Modal
          title={<h2 className="text-lg font-semibold">Role detail</h2>}
          centered
          open={openRoleDetail}
          onOk={() => setEditRoleDetail(true)}
          onCancel={() => {
            setOpenRoleDetail(false);
            setEditRoleDetail(false);
          }}
          maskClosable={false}
          width={500}
          okText={editRoleDetail ? "Save Changes" : "Edit Role"}
          okButtonProps={{
            style: {
              color: "#ffffff",
              minHeight: "48px",
              backgroundColor: "#7864ff",
              width: editRoleDetail ? "49%" : "100%",
              marginLeft: editRoleDetail ? "5px" : "0px",
            },
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: "#fff",
              border: "1px solid #b7b6b6",
              color: "black",
              minHeight: "48px",
              display: editRoleDetail ? "inline-block" : "none",
              width: editRoleDetail ? "49%" : "100%",
            },
          }}
        >
          <section className="">
            <div className="mt-4 space-y-6">
              <div>
                <label
                  htmlFor="role_name"
                  className="block mb-2 text-sm font-semibold text-Text-high-emphasis"
                >
                  Role name
                </label>

                <select
                  name="role_name"
                  id="role_name"
                  className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
                  disabled={editRoleDetail ? false : true}
                  defaultValue={"Staff"}
                >
                  <option value="Staff">Staff</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Bursary">Bursary</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="role_description"
                  className="block mb-2 text-sm font-semibold text-Text-high-emphasis"
                >
                  Role Description
                </label>
                <textarea
                  className={`border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis ${
                    editRoleDetail
                      ? "text-Text-high-emphasis"
                      : "text-Text-low-emphasis"
                  } h-24`}
                  id="role_description"
                  placeholder="What is this role about."
                  readOnly={editRoleDetail ? false : true}
                  defaultValue={
                    "This is any person outside of the admin working together in the school."
                  }
                />
                <span className="text-sm">0/40 characters remaining</span>
              </div>
            </div>
          </section>
        </Modal>
        <div className="flex justify-end gap-3">
          <DashboardButton
            variant="primary"
            onClick={() => setOpenAddNewRole(true)}
            leftElement={<Icon icon="tabler:plus" />}
            className="ml-0"
          >
            Add Role
          </DashboardButton>
        </div>

        <Table setOpenRoleDetail={setOpenRoleDetail} />
        {/* <div className="flex flex-col bg-black bg-opacity-95 text-white items-center gap-3 justify-center absolute inset-0">
          <span className="text-2xl">COMING</span>
          <div className="flex items-center gap-3 justify-center">
            <span className="text-9xl font-GTWalsheimPro">S</span>
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-grey-400"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary-purple-500 animate-spin"></div>
            </div>
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-grey-400"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary-purple-500 animate-spin"></div>
            </div>
            <span className="text-9xl font-GTWalsheimPro">N</span>
          </div>
        </div> */}
      </main>
    </Container>
  );
}
function Table({
  setOpenRoleDetail,
}: {
  setOpenRoleDetail: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          className="flex gap-2 w-full transition-all py-1 rounded-sm items-center"
          onClick={() => setOpenRoleDetail(true)}
        >
          <Icon icon="ep:more" fontSize={20} />
          <span className="text-sm">View details</span>
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <button className="flex gap-2 w-full transition-all py-1 rounded-sm">
          <Icon icon="solar:trash-bin-2-broken" fontSize={20} />
          <span className="text-sm">Remove</span>
        </button>
      ),
      key: "1",
    },
  ];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 normal-case border-b border-grey-300 bg-gray-50 ">
          <tr>
            <TableHeadingText title="S/N" styles="text-center" />
            <TableHeadingText title="Role name" />
            <TableHeadingText title="Description" />
            <TableHeadingText title="Number of staff" styles="text-center" />
            <TableHeadingText title="Date added" styles="text-center" />
            <th scope="col" className="px-6 py-3">
              <Icon icon="ion:filter" />
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {roleInfo.map((item, index) => (
            <tr className="bg-white border-b " key={item.roleName}>
              <TableBodyText
                title={(index + 1).toString()}
                styles="text-center"
              />
              <TableBodyText title={item.roleName} styles="whitespace-nowrap" />
              <TableBodyText
                title={item.description}
                styles="whitespace-nowrap max-w-[5rem] overflow-hidden"
              />
              <TableBodyText
                title={item.numberOfStaff.toString()}
                styles="whitespace-nowrap text-center"
              />

              <TableBodyText
                title={"12 May, 2023"}
                styles="whitespace-nowrap text-center"
              />

              <td className="px-6 py-4">
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  //   onOpenChange={() =>

                  //   }
                >
                  <button>
                    <Icon icon="ri:more-2-fill" />
                  </button>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableBodyText({
  title,
  styles,
  leftElement,
}: {
  title: string;
  styles?: string;
  leftElement?: JSX.Element;
}) {
  return (
    <td className={twMerge("px-4 py-1 font-medium text-gray-900", styles)}>
      {leftElement}
      {title}
    </td>
  );
}

function TableHeadingText({
  title,
  styles,
}: {
  title: string;
  styles?: string;
}) {
  return (
    <th
      scope="col"
      className={twMerge(
        "px-4 py-3 normal-case text-Text-high-emphasis  text-sm font-medium",
        styles
      )}
    >
      {title}
    </th>
  );
}
