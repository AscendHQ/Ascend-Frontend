import { Icon } from "@iconify/react";
import { MenuProps, Modal, notification } from "antd";
import { Dropdown } from "antd";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import PermissionDeniedState, {
  isAccessDeniedError,
} from "@/components/ui/permission-denied-state";
import {
  emptyPermissions,
  ModuleKey,
  PermissionFlags,
  RoleRecord,
  useAllRoles,
  useCreateRole,
  useDeleteRole,
  useInviteStaff,
  useUpdateRole,
} from "@/templates/Roles/hooks";
import PermissionGrid from "@/templates/Roles/permission-grid";

export default function Roles() {
  const [api, contextHolder] = notification.useNotification();

  const [openAddNewRole, setOpenAddNewRole] = React.useState(false);
  const [openRoleDetail, setOpenRoleDetail] = React.useState(false);
  const [editRoleDetail, setEditRoleDetail] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<RoleRecord | null>(
    null
  );

  const [newRoleName, setNewRoleName] = React.useState("");
  const [newRoleDescription, setNewRoleDescription] = React.useState("");
  const [newRolePermissions, setNewRolePermissions] = React.useState(
    emptyPermissions()
  );

  const [editName, setEditName] = React.useState("");
  const [editDescription, setEditDescription] = React.useState("");
  const [editPermissions, setEditPermissions] = React.useState(
    emptyPermissions()
  );

  const [openInvite, setOpenInvite] = React.useState(false);
  const [inviteFirstName, setInviteFirstName] = React.useState("");
  const [inviteLastName, setInviteLastName] = React.useState("");
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [invitePassword, setInvitePassword] = React.useState("");
  const [invitePermission, setInvitePermission] = React.useState("");

  const { data: roles, isLoading, isError, error } = useAllRoles();
  const { createRole, isCreatingRole } = useCreateRole(api);
  const { inviteStaff, isInvitingStaff } = useInviteStaff(api);
  const { updateRole, isUpdatingRole } = useUpdateRole(api);
  const { deleteRole } = useDeleteRole(api);

  const handleInvite = () => {
    if (
      !inviteFirstName.trim() ||
      !inviteLastName.trim() ||
      !inviteEmail.trim() ||
      !invitePassword ||
      !invitePermission
    ) {
      return;
    }

    inviteStaff(
      {
        first_name: inviteFirstName.trim(),
        last_name: inviteLastName.trim(),
        email: inviteEmail.trim(),
        password: invitePassword,
        permission: invitePermission,
      },
      {
        onSuccess: () => {
          setOpenInvite(false);
          setInviteFirstName("");
          setInviteLastName("");
          setInviteEmail("");
          setInvitePassword("");
          setInvitePermission("");
        },
      }
    );
  };

  const openDetailFor = (role: RoleRecord) => {
    setSelectedRole(role);
    setEditName(role.name);
    setEditDescription(role.description ?? "");
    const populated = emptyPermissions();
    (Object.keys(populated) as ModuleKey[]).forEach(key => {
      if (role[key]) {
        populated[key] = role[key] as PermissionFlags;
      }
    });
    setEditPermissions(populated);
    setEditRoleDetail(false);
    setOpenRoleDetail(true);
  };

  const togglePermission = (
    setter: React.Dispatch<
      React.SetStateAction<Record<ModuleKey, PermissionFlags>>
    >
  ) => (module: ModuleKey, flag: keyof PermissionFlags) => {
    setter(prev => ({
      ...prev,
      [module]: { ...prev[module], [flag]: !prev[module][flag] },
    }));
  };

  const handleAddRole = () => {
    if (!newRoleName.trim()) return;

    createRole(
      {
        name: newRoleName.trim(),
        description: newRoleDescription.trim(),
        ...newRolePermissions,
      },
      {
        onSuccess: () => {
          setOpenAddNewRole(false);
          setNewRoleName("");
          setNewRoleDescription("");
          setNewRolePermissions(emptyPermissions());
        },
      }
    );
  };

  const handleSaveEdit = () => {
    if (!selectedRole || !editName.trim()) return;

    updateRole(
      {
        id: selectedRole._id,
        data: {
          name: editName.trim(),
          description: editDescription.trim(),
          ...editPermissions,
        },
      },
      {
        onSuccess: () => {
          setOpenRoleDetail(false);
          setEditRoleDetail(false);
        },
      }
    );
  };

  return (
    <Container headerTitle="Roles">
      <main className="px-10 py-5 relative h-full bg-white">
        {contextHolder}
        <Modal
          title={<h2 className="text-lg font-semibold">Add new role</h2>}
          centered
          open={openAddNewRole}
          onOk={handleAddRole}
          onCancel={() => setOpenAddNewRole(false)}
          maskClosable={false}
          width={720}
          okText={"Add Role"}
          confirmLoading={isCreatingRole}
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
                  value={newRoleName}
                  onChange={e => setNewRoleName(e.target.value)}
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
                  value={newRoleDescription}
                  onChange={e => setNewRoleDescription(e.target.value)}
                  maxLength={120}
                  className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28"
                  id="role_description"
                  placeholder="What is this role about."
                />
                <span className="text-sm">
                  {120 - newRoleDescription.length}/120 characters remaining
                </span>
              </div>
              <div>
                <p className="block mb-2 text-sm font-semibold text-Text-high-emphasis">
                  What can this role access?
                </p>
                <PermissionGrid
                  permissions={newRolePermissions}
                  onChange={togglePermission(setNewRolePermissions)}
                />
              </div>
            </div>
          </section>
        </Modal>
        <Modal
          title={<h2 className="text-lg font-semibold">Role detail</h2>}
          centered
          open={openRoleDetail}
          onOk={() => {
            if (editRoleDetail) {
              handleSaveEdit();
            } else {
              setEditRoleDetail(true);
            }
          }}
          onCancel={() => {
            setOpenRoleDetail(false);
            setEditRoleDetail(false);
          }}
          maskClosable={false}
          width={720}
          okText={editRoleDetail ? "Save Changes" : "Edit Role"}
          confirmLoading={isUpdatingRole}
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
                  htmlFor="edit_role_name"
                  className="block mb-2 text-sm font-semibold text-Text-high-emphasis"
                >
                  Role name
                </label>

                <input
                  type="text"
                  id="edit_role_name"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  disabled={!editRoleDetail}
                  className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
                />
              </div>
              <div>
                <label
                  htmlFor="edit_role_description"
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
                  id="edit_role_description"
                  placeholder="What is this role about."
                  readOnly={!editRoleDetail}
                  value={editDescription}
                  maxLength={120}
                  onChange={e => setEditDescription(e.target.value)}
                />
                <span className="text-sm">
                  {120 - editDescription.length}/120 characters remaining
                </span>
              </div>
              <div>
                <p className="block mb-2 text-sm font-semibold text-Text-high-emphasis">
                  What can this role access?
                </p>
                <PermissionGrid
                  permissions={editPermissions}
                  onChange={togglePermission(setEditPermissions)}
                  disabled={!editRoleDetail}
                />
              </div>
              {selectedRole && (
                <p className="text-sm text-Text-meduim-emphasis">
                  {selectedRole.staff_count} staff member
                  {selectedRole.staff_count === 1 ? "" : "s"} currently
                  assigned to this role.
                </p>
              )}
            </div>
          </section>
        </Modal>
        <Modal
          title={
            <h2 className="text-lg font-semibold">Invite team member</h2>
          }
          centered
          open={openInvite}
          onOk={handleInvite}
          onCancel={() => setOpenInvite(false)}
          maskClosable={false}
          width={480}
          okText={"Send Invite"}
          confirmLoading={isInvitingStaff}
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
          <section className="space-y-4 mt-4">
            <p className="text-sm text-Text-meduim-emphasis">
              This creates a real login for them right away. Share the
              email and password with them directly - no invite email is
              sent yet.
            </p>
            <div className="flex gap-3">
              <div className="flex-1">
                <label
                  htmlFor="invite_first_name"
                  className="block mb-2 text-sm font-semibold text-Text-high-emphasis"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="invite_first_name"
                  value={inviteFirstName}
                  onChange={e => setInviteFirstName(e.target.value)}
                  className="border border-border-colour-light w-full rounded-lg bg-neutral-300 p-2"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="invite_last_name"
                  className="block mb-2 text-sm font-semibold text-Text-high-emphasis"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="invite_last_name"
                  value={inviteLastName}
                  onChange={e => setInviteLastName(e.target.value)}
                  className="border border-border-colour-light w-full rounded-lg bg-neutral-300 p-2"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="invite_email"
                className="block mb-2 text-sm font-semibold text-Text-high-emphasis"
              >
                Email
              </label>
              <input
                type="email"
                id="invite_email"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                className="border border-border-colour-light w-full rounded-lg bg-neutral-300 p-2"
              />
            </div>
            <div>
              <label
                htmlFor="invite_password"
                className="block mb-2 text-sm font-semibold text-Text-high-emphasis"
              >
                Temporary password
              </label>
              <input
                type="text"
                id="invite_password"
                value={invitePassword}
                onChange={e => setInvitePassword(e.target.value)}
                placeholder="At least 8 characters, upper+lowercase, a number, a special character"
                className="border border-border-colour-light w-full rounded-lg bg-neutral-300 p-2"
              />
            </div>
            <div>
              <label
                htmlFor="invite_permission"
                className="block mb-2 text-sm font-semibold text-Text-high-emphasis"
              >
                Role
              </label>
              <select
                id="invite_permission"
                value={invitePermission}
                onChange={e => setInvitePermission(e.target.value)}
                className="border border-border-colour-light w-full rounded-lg bg-neutral-300 p-2"
              >
                <option value="">Select a role</option>
                {(roles ?? []).map(role => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </Modal>
        <div className="flex justify-end gap-3">
          <DashboardButton
            variant="secondary"
            onClick={() => setOpenInvite(true)}
            leftElement={<Icon icon="tabler:user-plus" />}
          >
            Invite Team Member
          </DashboardButton>
          <DashboardButton
            variant="primary"
            onClick={() => setOpenAddNewRole(true)}
            leftElement={<Icon icon="tabler:plus" />}
            className="ml-0"
          >
            Add Role
          </DashboardButton>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : isError && isAccessDeniedError(error) ? (
          <PermissionDeniedState message="You don't have permission to view roles." />
        ) : !roles?.length ? (
          <div className="flex flex-col items-center gap-2 py-16 text-Text-meduim-emphasis">
            <p>No roles yet.</p>
            <p className="text-sm">
              Click &quot;Add Role&quot; to create your first one.
            </p>
          </div>
        ) : (
          <Table
            roles={roles}
            onView={openDetailFor}
            onDelete={deleteRole}
          />
        )}
      </main>
    </Container>
  );
}
function Table({
  roles,
  onView,
  onDelete,
}: {
  roles: RoleRecord[];
  onView: (role: RoleRecord) => void;
  onDelete: (id: string) => void;
}) {
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
          {roles.map((item, index) => {
            const items: MenuProps["items"] = [
              {
                label: (
                  <button
                    className="flex gap-2 w-full transition-all py-1 rounded-sm items-center"
                    onClick={() => onView(item)}
                  >
                    <Icon icon="ep:more" fontSize={20} />
                    <span className="text-sm">View details</span>
                  </button>
                ),
                key: "0",
              },
              {
                label: (
                  <button
                    className="flex gap-2 w-full transition-all py-1 rounded-sm"
                    onClick={() => onDelete(item._id)}
                  >
                    <Icon icon="solar:trash-bin-2-broken" fontSize={20} />
                    <span className="text-sm">Remove</span>
                  </button>
                ),
                key: "1",
              },
            ];

            return (
              <tr className="bg-white border-b " key={item._id}>
                <TableBodyText
                  title={(index + 1).toString()}
                  styles="text-center"
                />
                <TableBodyText title={item.name} styles="whitespace-nowrap" />
                <TableBodyText
                  title={item.description || "-"}
                  styles="whitespace-nowrap max-w-[5rem] overflow-hidden"
                />
                <TableBodyText
                  title={item.staff_count.toString()}
                  styles="whitespace-nowrap text-center"
                />

                <TableBodyText
                  title={new Date(item.createdAt).toLocaleDateString(
                    "en-US",
                    { day: "numeric", month: "short", year: "numeric" }
                  )}
                  styles="whitespace-nowrap text-center"
                />

                <td className="px-6 py-4">
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <button>
                      <Icon icon="ri:more-2-fill" />
                    </button>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
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
