import { Icon } from "@iconify/react";
import { notification } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_OVERVIEW } from "@/config/links";
import { useCreateSchool } from "@/templates/Schools/hooks";

export default function NewSchool() {
  const [api, contextHolder] = notification.useNotification();
  const { createSchool, isCreatingSchool } = useCreateSchool(api);

  const [schoolName, setSchoolName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
    if (
      !schoolName.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password
    ) {
      return;
    }

    createSchool(
      {
        organization_name: schoolName.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password,
      },
      {
        onSuccess: () => {
          setSchoolName("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Container headerTitle="Add a New School">
      <main className="bg-white px-10 pt-7 h-full">
        {contextHolder}
        <div className="flex justify-between">
          <Link
            href={DASHBOARD_OVERVIEW}
            className="flex items-center gap-3 text-sm"
          >
            <Icon icon="teenyicons:arrow-left-solid" />
            <span>Back</span>
          </Link>
        </div>

        <div className="max-w-xl mt-10">
          <h4 className="text-Text-high-emphasis font-semibold text-lg">
            Onboard a new school
          </h4>
          <p className="text-sm text-Text-meduim-emphasis mb-8">
            This creates a brand new, completely separate school account
            with its own admin login. Share the email and password you
            set below with that school's admin directly - no invite
            email is sent.
          </p>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="school_name"
                className="block mb-2 text-sm font-medium text-Text-high-emphasis"
              >
                School name
              </label>
              <input
                type="text"
                id="school_name"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                className="border border-border-colour-light w-full rounded-lg bg-neutral-300 p-2"
                placeholder="e.g. Bright Future Academy"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="admin_first_name"
                  className="block mb-2 text-sm font-medium text-Text-high-emphasis"
                >
                  Admin first name
                </label>
                <input
                  type="text"
                  id="admin_first_name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="border border-border-colour-light w-full rounded-lg bg-neutral-300 p-2"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="admin_last_name"
                  className="block mb-2 text-sm font-medium text-Text-high-emphasis"
                >
                  Admin last name
                </label>
                <input
                  type="text"
                  id="admin_last_name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="border border-border-colour-light w-full rounded-lg bg-neutral-300 p-2"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="admin_email"
                className="block mb-2 text-sm font-medium text-Text-high-emphasis"
              >
                Admin email
              </label>
              <input
                type="email"
                id="admin_email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border border-border-colour-light w-full rounded-lg bg-neutral-300 p-2"
              />
            </div>
            <div>
              <label
                htmlFor="admin_password"
                className="block mb-2 text-sm font-medium text-Text-high-emphasis"
              >
                Temporary password
              </label>
              <input
                type="text"
                id="admin_password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters, upper+lowercase, a number, a special character"
                className="border border-border-colour-light w-full rounded-lg bg-neutral-300 p-2"
              />
            </div>
            <button
              className="text-white bg-primary-purple-700 rounded-lg py-3 px-10 font-semibold text-sm disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isCreatingSchool}
            >
              Create School
            </button>
          </div>
        </div>
      </main>
    </Container>
  );
}
