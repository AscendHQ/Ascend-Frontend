import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

import { axiosInstance } from "@/api";
import ErrorBoundary from "@/components/common/error-boundary";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import PermissionDeniedState, {
  isAccessDeniedError,
} from "@/components/ui/permission-denied-state";
import { NEW_BULK_STUDENT, NEW_STUDENT } from "@/config/links";
import { StudentsTable } from "@/templates/Database/student";
import { showAllStudentContext } from "@/templates/Database/student/student-types";

export default function DatabaseStudents() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [debouncedSearchName, setDebouncedSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("active");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchName(searchName);
      setCurrentPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchName]);

  const studentData = useQuery({
    queryKey: ["allStudent", currentPage, debouncedSearchName, statusFilter],
    queryFn: () =>
      fetchAllStudent(currentPage, debouncedSearchName, statusFilter),
  });

  return (
    <ErrorBoundary fallback="Unexpected Error">
      <AllStudentContext.Provider
        value={{
          totalNumberOfStudent: studentData?.data?.total_documents,
          limitOfStudent: studentData?.data?.limit,
          currentPage: studentData?.data?.page,
          setCurrentPage,
        }}
      >
        <Container headerTitle="Students">
          {studentData.isLoading ? (
            <Spinner />
          ) : studentData.isError && isAccessDeniedError(studentData.error) ? (
            <PermissionDeniedState message="You don't have permission to view students." />
          ) : studentData.isError ? (
            <div className="m-4 rounded-lg border border-secondary-red-500 bg-white p-8 text-center text-secondary-red-600 sm:m-6">
              Students could not be loaded. Please try again.
            </div>
          ) : (
            <>
              <main className="min-h-full bg-neutral-300 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
                      Students
                    </h1>
                    <p className="mt-1 text-sm text-Text-meduim-emphasis">
                      Register, find, and manage every student record.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <DashboardButton
                      variant="primary"
                      className="ml-0"
                      leftElement={<Icon icon="tabler:plus" />}
                      isLink
                      path={NEW_STUDENT}
                    >
                      Register student
                    </DashboardButton>
                    <DashboardButton
                      variant="secondary"
                      className="ml-0"
                      leftElement={
                        <Icon icon="material-symbols:upload-file-outline" />
                      }
                      isLink
                      path={NEW_BULK_STUDENT}
                    >
                      Import CSV
                    </DashboardButton>
                  </div>
                </div>
                <section className="mt-6 rounded-lg border border-border-colour-light bg-white p-4 sm:p-5">
                  <div className="flex max-w-2xl flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <input
                        type="search"
                        placeholder="Search Student"
                        aria-label="Search students"
                        className="w-full rounded-lg border border-border-colour-light px-3 py-2.5 pr-10 text-sm outline-none focus:border-primary-purple-700"
                        value={searchName}
                        onChange={e => setSearchName(e.target.value)}
                      />
                      <Icon
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-Text-meduim-emphasis"
                        icon="mingcute:search-line"
                      />
                    </div>
                    <select
                      aria-label="Filter students by status"
                      className="rounded-lg border border-border-colour-light bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-purple-700"
                      value={statusFilter}
                      onChange={e => {
                        setStatusFilter(
                          e.target.value as "all" | "active" | "inactive"
                        );
                        setCurrentPage(1);
                      }}
                    >
                      <option value="active">Active students</option>
                      <option value="inactive">Inactive students</option>
                      <option value="all">All students</option>
                    </select>
                  </div>

                  <StudentsTable
                    data={studentData?.data?.students}
                    isFetching={studentData?.isFetching}
                  />
                </section>
              </main>
            </>
          )}
        </Container>
      </AllStudentContext.Provider>
    </ErrorBoundary>
  );
}

export const AllStudentContext = createContext<
  showAllStudentContext | undefined
>(undefined);

async function fetchAllStudent(
  currentPage: number,
  searchedName: string,
  statusFilter: "all" | "active" | "inactive"
) {
  const params = new URLSearchParams({
    limit: "6",
    page: currentPage.toString(),
    name: searchedName,
  });

  if (statusFilter !== "all") {
    params.set("is_active", String(statusFilter === "active"));
  }

  return await axiosInstance
    .get(`/students?${params.toString()}`)
    .then(res => res.data);
}
