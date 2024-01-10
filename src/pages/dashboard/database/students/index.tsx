import { Icon } from "@iconify/react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { axiosInstance } from "@/api";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/Loading";
import { NEW_STUDENT } from "@/config/links";
import { StudentsTable } from "@/templates/Database/student";

type showAllStudentContext = {
  totalNumberOfStudent: number;
  currentPage: number;
  limitOfStudent: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const AllStudentContext = createContext<
  showAllStudentContext | undefined
>(undefined);
const fetchAllStudent = async (currentPage: number) => {
  return await axiosInstance
    .get(`/students?limit=4&page=${currentPage}`)
    .then(res => res.data);
};
export default function DatabaseStudents() {
  // useEffect(() => {
  //   const url =
  //     "https://raw.githubusercontent.com/Eniolayo/Nigeria-s-State-and-LGA/main/nigeria-state-and-lgas.json";

  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Handle the JSON data
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching JSON:", error);
  //     });
  // }, []);
  // const [currentStudentGender, setCurrentStudentGender] = React.useState<
  //   "all" | studentInfoProp["personal_information"]["gender"]
  // >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const studentData = useQuery({
    queryKey: ["allStudent"],
    queryFn: () => fetchAllStudent(currentPage),
    placeholderData: keepPreviousData,
  });
  console.log(studentData.isPlaceholderData);
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

  console.log(studentData.data);

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
        /> */}
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
