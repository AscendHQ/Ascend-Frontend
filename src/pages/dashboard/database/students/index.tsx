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
import { NEW_STUDENT } from "@/config/links";
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
    queryKey: [
      "allStudent",
      currentPage,
      debouncedSearchName,
      statusFilter,
    ],
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
            <div className="bg-white p-10 text-secondary-red-600">
              Students could not be loaded. Please try again.
            </div>
          ) : (
            <>
              <div className="bg-white p-10">
                <DashboardButton
                  variant="primary"
                  leftElement={<Icon icon="tabler:plus" />}
                  isLink
                  path={NEW_STUDENT}
                >
                  Register student
                </DashboardButton>
                <div className="mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <input
                      type="search"
                      placeholder="Search Student"
                      aria-label="Search students"
                      className="rounded text-sm w-full px-2 py-3 border border-grey-800"
                      value={searchName}
                      onChange={e => setSearchName(e.target.value)}
                    />
                    <Icon
                      className="absolute bottom-1/2 translate-y-1/2 right-2"
                      icon="mingcute:search-line"
                    />
                  </div>
                  <select
                    aria-label="Filter students by status"
                    className="rounded border border-grey-800 bg-white px-3 py-3 text-sm"
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
              </div>
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
