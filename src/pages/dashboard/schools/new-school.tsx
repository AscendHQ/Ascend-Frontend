import { Icon } from "@iconify/react";
import { notification } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { PLATFORM_SCHOOLS } from "@/config/links";
import { useCreateSchool } from "@/templates/Schools/hooks";

export default function NewSchool() {
  const [api, contextHolder] = notification.useNotification();
  const { createSchool, isCreatingSchool } = useCreateSchool(api);

  const [schoolName, setSchoolName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = () => {
    if (
      !schoolName.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password
    ) {
      api.error({
        message: "Complete the required fields",
        description:
          "Enter the school name and the administrator's full login details.",
      });
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
      <main className="min-h-full bg-neutral-300 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
        {contextHolder}
        <div className="mx-auto max-w-4xl">
          <Link
            href={PLATFORM_SCHOOLS}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-purple-700"
          >
            <Icon icon="teenyicons:arrow-left-solid" />
            <span>Back to schools</span>
          </Link>

          <section className="mt-5 overflow-hidden rounded-lg border border-border-colour-light bg-white">
            <div className="border-b border-border-colour-light p-5 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-purple-700">
                School onboarding
              </p>
              <h1 className="mt-1 text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
                Create a school account
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-Text-meduim-emphasis">
                Create a separate workspace and its first administrator. No
                invitation email is sent, so share the login details securely.
              </p>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              <div>
                <h2 className="font-semibold text-Text-high-emphasis">
                  School information
                </h2>
                <p className="mt-1 text-sm text-Text-meduim-emphasis">
                  Use the school's official display name.
                </p>
              </div>
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
                  autoComplete="organization"
                  className="w-full rounded-lg border border-border-colour-light bg-white px-3 py-2.5 outline-none focus:border-primary-purple-700"
                  placeholder="e.g. Bright Future Academy"
                />
              </div>
              <div className="border-t border-border-colour-light pt-6">
                <h2 className="font-semibold text-Text-high-emphasis">
                  Administrator login
                </h2>
                <p className="mt-1 text-sm text-Text-meduim-emphasis">
                  The administrator can complete the school's remaining setup
                  after signing in.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
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
                    autoComplete="given-name"
                    className="w-full rounded-lg border border-border-colour-light bg-white px-3 py-2.5 outline-none focus:border-primary-purple-700"
                  />
                </div>
                <div>
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
                    autoComplete="family-name"
                    className="w-full rounded-lg border border-border-colour-light bg-white px-3 py-2.5 outline-none focus:border-primary-purple-700"
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
                  autoComplete="email"
                  placeholder="admin@school.com"
                  className="w-full rounded-lg border border-border-colour-light bg-white px-3 py-2.5 outline-none focus:border-primary-purple-700"
                />
              </div>
              <div>
                <label
                  htmlFor="admin_password"
                  className="block mb-2 text-sm font-medium text-Text-high-emphasis"
                >
                  Temporary password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="admin_password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Enter a secure temporary password"
                    className="w-full rounded-lg border border-border-colour-light bg-white px-3 py-2.5 pr-11 outline-none focus:border-primary-purple-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(value => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-Text-meduim-emphasis"
                  >
                    <Icon
                      icon={
                        showPassword
                          ? "material-symbols:visibility-off-outline"
                          : "material-symbols:visibility-outline"
                      }
                    />
                  </button>
                </div>
                <p className="mt-2 text-xs text-Text-meduim-emphasis">
                  Use 8+ characters with uppercase, lowercase, a number, and a
                  symbol.
                </p>
              </div>
              <div className="flex flex-col-reverse gap-3 border-t border-border-colour-light pt-6 sm:flex-row sm:justify-end">
                <Link
                  href={PLATFORM_SCHOOLS}
                  className="rounded-lg border border-border-colour-light px-6 py-3 text-center text-sm font-semibold text-Text-high-emphasis"
                >
                  Cancel
                </Link>
                <button
                  className="rounded-lg bg-primary-purple-700 px-8 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={isCreatingSchool}
                >
                  {isCreatingSchool ? "Creating school..." : "Create school"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Container>
  );
}
