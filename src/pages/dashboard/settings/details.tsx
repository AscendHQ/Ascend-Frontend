import { notification } from "antd";
import React from "react";

import AccountSettingContainer from "@/components/layout/account-setting/container";
import { Spinner } from "@/components/ui/Loading";
import {
  useAccountProfile,
  useChangePassword,
  useUpdateAccountProfile,
} from "@/templates/Settings/hooks";

export default function AccountSettingDetails() {
  return (
    <AccountSettingContainer headerTitle="Account Setting">
      <div className="mt-8">
        <PersonalInformation />
        <ChangePassword />
      </div>
    </AccountSettingContainer>
  );
}

function PersonalInformation() {
  const [api, contextHolder] = notification.useNotification();
  const { data: profile, isLoading } = useAccountProfile();
  const { updateAccountProfile, isUpdatingAccount } =
    useUpdateAccountProfile(api);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  React.useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name ?? "");
      setLastName(profile.last_name ?? "");
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 border-border-colour-light">
      {contextHolder}
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Personal Information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This is your personal account profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-4">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            First name
          </label>
          <input
            type="text"
            id="first_name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
            required
          />
        </div>
        <div className="lg:min-w-full flex justify-end">
          <button
            className="text-white bg-primary-purple-700 rounded-lg py-3 px-10 font-semibold text-sm disabled:opacity-50"
            onClick={() =>
              updateAccountProfile({
                first_name: firstName,
                last_name: lastName,
              })
            }
            disabled={isUpdatingAccount}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function ChangePassword() {
  const [api, contextHolder] = notification.useNotification();
  const { changePassword, isChangingPassword } = useChangePassword(api);

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = () => {
    changePassword(
      {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      },
      {
        onSuccess: () => {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
      }
    );
  };

  return (
    <div className="flex justify-between gap-16 py-16 border-b-2 border-border-colour-light">
      {contextHolder}
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Change password
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          Set everything regarding your account security.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-4">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="current_password"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Current Password
          </label>
          <input
            type="password"
            id="current_password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
            placeholder="*********"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="new_password"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            New Password
          </label>
          <input
            type="password"
            id="new_password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
            placeholder="*********"
            required
          />
        </div>

        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
            placeholder="*********"
            required
          />
        </div>
        <div className="lg:min-w-full flex justify-end">
          <button
            className="text-white bg-primary-purple-700 rounded-lg py-3 px-10 font-semibold text-sm disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isChangingPassword}
          >
            Update password
          </button>
        </div>
      </div>
    </div>
  );
}
