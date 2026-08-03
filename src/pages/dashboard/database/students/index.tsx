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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchName(searchName);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchName]);

  const studentData = useQuery({
    queryKey: ["allStudent"],
    queryFn: () => fetchAllStudent(currentPage, debouncedSearchName),
  });

  useEffect(() => {
    studentData.refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debouncedSearchName]);

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
                <div className="relative max-w-sm mt-5">
                  <input
                    type="search"
                    placeholder="Search Student"
                    className="rounded text-sm w-full px-2 py-3 border border-grey-800"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                  />
                  <Icon
                    className="absolute bottom-1/2 translate-y-1/2 right-2"
                    icon="mingcute:search-line"
                  />
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

async function fetchAllStudent(currentPage: number, searchedName: string) {
  return await axiosInstance
    .get(`/students?limit=6&page=${currentPage}&name=${searchedName}`)
    .then(res => res.data);
}
