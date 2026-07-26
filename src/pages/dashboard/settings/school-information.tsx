import { notification } from "antd";
import React from "react";

import AccountSettingContainer from "@/components/layout/account-setting/container";
import { Spinner } from "@/components/ui/Loading";
import { useOrganization, useUpdateOrganization } from "@/templates/Settings/hooks";

export default function AccountSettingSchoolInfo() {
  return (
    <AccountSettingContainer headerTitle="Account Setting">
      <div className="mt-8">
        <SchoolInformation />
      </div>
    </AccountSettingContainer>
  );
}

function SchoolInformation() {
  const [api, contextHolder] = notification.useNotification();
  const { data: organization, isLoading } = useOrganization();
  const { updateOrganization, isUpdatingOrganization } =
    useUpdateOrganization(api);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [country, setCountry] = React.useState("");

  React.useEffect(() => {
    if (organization) {
      setName(organization.name ?? "");
      setDescription(organization.description ?? "");
      setStreet(organization.address?.street ?? "");
      setZipCode(organization.address?.zip_code ?? "");
      setCountry(organization.address?.country ?? "");
    }
  }, [organization]);

  const handleSave = () => {
    updateOrganization({
      name,
      description,
      address: { street, zip_code: zipCode, country },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pb-16 border-b-2 border-border-colour-light">
      {contextHolder}
      <div className="flex justify-between gap-16">
        <div className="w-96">
          <h4 className="text-Text-high-emphasis font-semibold">
            School Information
          </h4>
          <p className="text-sm tracking-tight text-gray-800">
            This will be displayed on your organization profile.
          </p>
        </div>
        <div className="flex flex-1 flex-wrap gap-5">
          <div className="lg:min-w-full flex-1">
            <label
              htmlFor="school_name"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              School name
            </label>
            <input
              type="text"
              id="school_name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
              placeholder="Your school's name"
              required
            />
          </div>
          <div className="lg:min-w-full flex-1">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
              placeholder="A short description of your school"
            />
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="street"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Street address
            </label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={e => setStreet(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
              placeholder="4517 Washington Ave"
            />
          </div>
          <div className="lg:min-w-[150px] flex-1">
            <label
              htmlFor="zip_code"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Zip code
            </label>
            <input
              type="text"
              id="zip_code"
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
              placeholder="39495"
            />
          </div>
          <div className="lg:min-w-[200px] flex-1">
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
              placeholder="Nigeria"
            />
          </div>
          <div className="lg:min-w-full flex justify-end">
            <button
              className="text-white bg-primary-purple-700 rounded-lg py-3 px-10 font-semibold text-sm disabled:opacity-50"
              onClick={handleSave}
              disabled={isUpdatingOrganization}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
