import { Icon } from "@iconify/react";
import { Select } from "antd";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Container } from "@/components/layout/dashboard";
import TeacherResultApprovals from "@/components/portal/teacher-result-approvals";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import PermissionDeniedState, {
  isAccessDeniedError,
} from "@/components/ui/permission-denied-state";
import { DASHBOARD_RESULT_INFO, NEW_RESULT } from "@/config/links";
import { ResultRecord, useAllResults } from "@/templates/Result/hooks";
import { useOrganization } from "@/templates/Settings/hooks";

const getSessionOptions = (configuredSession?: string) => {
  const currentYear = new Date().getFullYear();
  const sessions = Array.from({ length: 7 }, (_, index) => {
    const year = currentYear + 1 - index;
    return `${year}/${year + 1}`;
  });
  const options =
    configuredSession && !sessions.includes(configuredSession)
      ? [configuredSession, ...sessions]
      : sessions;
  return options.map(value => ({ value, label: value }));
};

const TERM_OPTIONS = ["1st Term", "2nd Term", "3rd Term"].map(value => ({
  value,
  label: value,
}));

export default function Results() {
  const { data: organization } = useOrganization();
  const [session, setSession] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [search, setSearch] = React.useState("");
  const sessionOptions = React.useMemo(
    () => getSessionOptions(organization?.academic_settings?.current_session),
    [organization?.academic_settings?.current_session]
  );

  React.useEffect(() => {
    const settings = organization?.academic_settings;
    if (settings?.current_session && settings.current_term) {
      setSession(settings.current_session);
      setTerm(settings.current_term);
    } else {
      setSession(sessionOptions[0]?.value ?? "");
      setTerm("1st Term");
    }
  }, [organization?.academic_settings, sessionOptions]);

  const { data, isLoading, isError, error } = useAllResults({ session, term });
  const results = data?.results ?? [];
  const normalizedSearch = search.trim().toLowerCase();
  const filteredResults = normalizedSearch
    ? results.filter(result => {
        const studentName = result.student
          ? `${result.student.personal_information.first_name} ${result.student.personal_information.last_name}`.toLowerCase()
          : "";
        return (
          studentName.includes(normalizedSearch) ||
          result.student?.registration_number
            ?.toLowerCase()
            .includes(normalizedSearch)
        );
      })
    : results;

  return (
    <Container headerTitle="Results">
      <main className="relative bg-white px-4 py-5 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
              Student results
            </h1>
            <p className="mt-1 text-sm text-Text-meduim-emphasis">
              Review, upload, and manage results for {session}, {term}.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/results/bulk"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-purple-700 px-4 py-2.5 text-sm font-semibold text-primary-purple-700 transition-colors hover:bg-primary-purple-100"
            >
              <Icon icon="material-symbols:upload-file-outline" />
              Bulk upload
            </Link>
            <DashboardButton
              variant="primary"
              isLink
              leftElement={<Icon icon="tabler:plus" />}
              path={NEW_RESULT}
            >
              Add Results
            </DashboardButton>
          </div>
        </div>
        <TeacherResultApprovals />
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative block w-full lg:min-w-[300px] lg:max-w-md">
            <input
              type="search"
              placeholder="Search student's name or S/N"
              value={search}
              onChange={event => setSearch(event.target.value)}
              className="w-full rounded-lg border border-border-colour-light px-3 py-2.5 pr-10 text-sm outline-none focus:border-primary-purple-700"
            />
            <Icon
              className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-Text-meduim-emphasis"
              icon="mingcute:search-line"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 items-center rounded-lg border border-border-colour-light bg-white pl-3 sm:flex-none">
              <span className="text-sm font-semibold text-Text-high-emphasis">
                Session
              </span>
              <Select
                value={session}
                style={{ width: 110, fontSize: 14, borderRadius: 5 }}
                onChange={value => setSession(value)}
                className="[&>*]:!text-sm [&>*]:!border-none"
                options={sessionOptions}
              />
            </div>
            <div className="flex flex-1 items-center rounded-lg border border-border-colour-light bg-white pl-3 sm:flex-none">
              <span className="text-sm font-semibold text-Text-high-emphasis">
                Term
              </span>
              <Select
                value={term}
                style={{ width: 110, fontSize: 14, borderRadius: 5 }}
                onChange={value => setTerm(value)}
                className="[&>*]:!text-sm [&>*]:!border-none"
                options={TERM_OPTIONS}
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : isError && isAccessDeniedError(error) ? (
          <PermissionDeniedState message="You don't have permission to view results." />
        ) : !results.length ? (
          <div className="mt-8 flex flex-col items-center gap-2 rounded-lg border border-dashed border-border-colour-light py-16 text-Text-meduim-emphasis">
            <p>
              No results for {session}, {term} yet.
            </p>
            <p className="text-sm">
              Click &quot;Add Results&quot; to record the first one.
            </p>
          </div>
        ) : !filteredResults.length ? (
          <div className="mt-8 rounded-lg border border-dashed border-border-colour-light py-16 text-center text-Text-meduim-emphasis">
            No results match &quot;{search}&quot;.
          </div>
        ) : (
          <Table results={filteredResults} />
        )}
      </main>
    </Container>
  );
}

function Table({ results }: { results: ResultRecord[] }) {
  return (
    <div className="relative mt-8 overflow-x-auto rounded-lg border border-border-colour-light">
      <table className="w-full min-w-[700px] text-left text-sm text-Text-meduim-emphasis">
        <thead className="border-b border-border-colour-light bg-neutral-300 text-Text-high-emphasis">
          <tr>
            <TableHeadingText title="S/N" styles="text-center" />
            <TableHeadingText title="Full name" />
            <TableHeadingText title="Date added" />
            <TableHeadingText title="Status" styles="text-center" />
            <TableHeadingText title="Action" styles="text-center" />
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr
              className="border-b border-border-colour-light bg-white last:border-0"
              key={item._id}
            >
              <TableBodyText
                title={(index + 1).toString()}
                styles="text-center"
              />
              <TableBodyText
                title={
                  item.student
                    ? `${item.student.personal_information.first_name} ${item.student.personal_information.last_name}`
                    : "-"
                }
                styles="whitespace-nowrap"
              />
              <TableBodyText
                title={new Date(item.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                styles="whitespace-nowrap"
              />
              <TableBodyText
                title={
                  item.status
                    ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                    : "Pending"
                }
                styles="whitespace-nowrap text-center"
              />
              <td>
                <Link
                  href={DASHBOARD_RESULT_INFO(item._id)}
                  className="mx-auto my-3 block w-fit rounded-lg border border-border-colour-light px-3 py-2 text-sm font-semibold text-primary-purple-700 transition-colors hover:border-primary-purple-700"
                >
                  View Result
                </Link>
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
    <td
      className={twMerge(
        "px-4 py-3 font-medium text-Text-high-emphasis",
        styles
      )}
    >
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
