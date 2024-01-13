import { Icon } from "@iconify/react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import { NEW_STUDENT } from "@/config/links";
import { StudentsTable } from "@/templates/Database/student";
import { showAllStudentContext } from "@/templates/Database/student/student-types";

export default function DatabaseStudents() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const studentData = useQuery({
    queryKey: ["allStudent"],
    queryFn: () => fetchAllStudent(currentPage),
    placeholderData: keepPreviousData,
  });

  // Prefetch the next page!
  useEffect(() => {
    if (studentData.isPlaceholderData && studentData.data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["allStudent", currentPage],
        queryFn: () => {
          return fetchAllStudent(currentPage);
        },
      });
    }
  }, [
    studentData.data,
    studentData.isPlaceholderData,
    currentPage,
    queryClient,
  ]);

  function invalidateAllStudentData() {
    queryClient.invalidateQueries({
      queryKey: ["allStudent", currentPage],
      type: "active",
      refetchType: "active",
    });
    // queryClient.invalidateQueries("allStudent", {
    //   refetchActive: true,
    //   refetchInactive: false,
    // });
  }

  // const { totalNumberOfStudent, noOfFemaleStudent, noOfMaleStudent } =
  //   useStudentStatistics({
  //     data: studentInfo,
  //   });

  // const tabNumbers = {
  //   all: totalNumberOfStudent,
  //   male: noOfMaleStudent,
  //   female: noOfFemaleStudent,
  // };

  return (
    <AllStudentContext.Provider
      value={{
        totalNumberOfStudent: studentData.data?.total_documents,
        limitOfStudent: studentData.data?.limit,
        currentPage: studentData.data?.page,
        setCurrentPage,
      }}
    >
      <Container headerTitle="Students">
        {studentData.isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="bg-white p-10">
              {/* <StatOverview /> */}

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
                />
                <button className="absolute bottom-1/2 translate-y-1/2 right-2">
                  <Icon icon="mingcute:search-line" />
                </button>
              </div>
              {/* <StudentTabNav
                    tabNumbers={tabNumbers}
                    currentCategory={currentStudentGender}
                    setCurrentCategory={setCurrentStudentGender}
                  /> 
              */}
              <StudentsTable
                data={studentData.data.students}
                invalidateAllStudentData={invalidateAllStudentData}
              />
            </div>
          </>
        )}
      </Container>
    </AllStudentContext.Provider>
  );
}

export const AllStudentContext = createContext<
  showAllStudentContext | undefined
>(undefined);

async function fetchAllStudent(currentPage: number) {
  return await axiosInstance
    .get(`/students?limit=50&page=${currentPage}`)
    .then(res => res.data);
}
