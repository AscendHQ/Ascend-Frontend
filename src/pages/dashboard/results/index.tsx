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
      <main className="px-10 py-5 relative bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-Text-high-emphasis font-semibold text-xl">
            {session} Session - {term}
          </h3>

          <DashboardButton
            variant="primary"
            isLink
            leftElement={<Icon icon="tabler:plus" />}
            path={NEW_RESULT}
          >
            Add Results
          </DashboardButton>
        </div>
        <TeacherResultApprovals />
        <div className="flex justify-between items-center mt-6">
          <div className="relative block border min-w-[300px]">
            <input
              type="search"
              placeholder="Search student's name or S/N"
              value={search}
              onChange={event => setSearch(event.target.value)}
              className="rounded text-sm w-full px-2 py-3 border border-grey-800"
            />
            <Icon
              className="absolute bottom-1/2 translate-y-1/2 right-2"
              icon="mingcute:search-line"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-default-black pl-2 rounded">
              <span className="text-sm font-bold text-gray-800">Session :</span>
              <Select
                value={session}
                style={{ width: 110, fontSize: 14, borderRadius: 5 }}
                onChange={value => setSession(value)}
                className="[&>*]:!text-sm [&>*]:!border-none"
                options={sessionOptions}
              />
            </div>
            <div className="flex items-center border border-default-black pl-2 rounded">
              <span className="text-sm font-bold text-gray-800">Term :</span>
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
          <div className="flex flex-col items-center gap-2 py-16 text-Text-meduim-emphasis">
            <p>
              No results for {session}, {term} yet.
            </p>
            <p className="text-sm">
              Click &quot;Add Results&quot; to record the first one.
            </p>
          </div>
        ) : !filteredResults.length ? (
          <div className="py-16 text-center text-Text-meduim-emphasis">
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 normal-case border-b bg-neutral-300 border-grey-300 bg-gray-50 ">
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
            <tr className="bg-white border-b  border-grey-300 " key={item._id}>
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
                  className="border-1.5 rounded border-border-colour-light text-gray-800 py-2 px-3 my-4 mx-auto block w-fit"
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
