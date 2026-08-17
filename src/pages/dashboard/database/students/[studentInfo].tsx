import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { axiosInstance } from "@/api";
import ErrorBoundary from "@/components/common/error-boundary";
import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import LoadingState, { Spinner } from "@/components/ui/Loading";
import PermissionDeniedState, {
  isAccessDeniedError,
} from "@/components/ui/permission-denied-state";
import { DASHBOARD_STUDENT } from "@/config/links";
import {
  EditAcademicDetails,
  EditAdditionalInformation,
  EditContactInformation,
  EditGuardianInformation,
  EditHostelAccommodation,
  EditMedicalInformation,
  EditPersonalInformation,
} from "@/templates/Database/student";
import { transformData } from "@/templates/Database/student/add-new-student.hook";
import { useStudentData } from "@/templates/Database/student/hook";
import {
  StudentDataWithActive,
  StudentInfoContextType,
  studentInfoSchema,
  StudentInfoSchemaType,
} from "@/templates/Database/student/student-types";

import { useFetchClassInfo } from "../classes";

export const StudentInfoContext = React.createContext<
  StudentInfoContextType | undefined
>(undefined);

export default function StudentInfo() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isStudentActive, setIsStudentActive] = React.useState(false);
  const [api, contextHolder] = notification.useNotification();
  const toast = api;

  const toggle = () => {
    setIsStudentActive(prev => !prev);
  };
  const studentRegId = router.query.studentInfo as string;

  const currentSubjectData: UseQueryResult<
    { students: StudentDataWithActive[] },
    Error
  > = useStudentData(studentRegId);

  const studentDataFromBackend = currentSubjectData.data;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<StudentInfoSchemaType>({
    resolver: zodResolver(studentInfoSchema),
  });

  const { mutate: updateStudentInfo, isPending: isPendingExistingStudent } =
    useMutation({
      mutationFn: (data: StudentInfoSchemaType) => {
        return axiosInstance
          .put(
            `/students/${studentDataFromBackend?.students[0]?._id}`,
            {
              ...transformData(data),
              is_active: isStudentActive,
            }
          )
          .then(res => res.data);
      },
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["allStudent"] }),
          queryClient.invalidateQueries({
            queryKey: ["currentStudentInfo", studentRegId],
          }),
          queryClient.invalidateQueries({ queryKey: ["dashboardOverview"] }),
          queryClient.invalidateQueries({ queryKey: ["fetchStudents"] }),
          queryClient.invalidateQueries({
            queryKey: ["fetchStudentRegistration"],
          }),
        ]);
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
          ),
          description: "Student has been updated successfully",
          className: "ant-toast",
        });
        await router.push(DASHBOARD_STUDENT);
      },
      onError: (error: Error & { response?: { data?: string } }) => {
        api.open({
          message: (
            <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
          ),
          description:
            error.response?.data ??
            "The student could not be updated. Please try again.",
          className: "ant-toast",
        });
      },
    });
  const classData = useFetchClassInfo();

  const onSubmit = (data: StudentInfoSchemaType) => {
    updateStudentInfo(data);
  };

  const setFormValues = (student: StudentDataWithActive) => {
    const formData = {
      first_name: student?.personal_information?.first_name,
      last_name: student?.personal_information?.last_name,
      middle_name: student?.personal_information?.middle_name,
      previous_school_attended: student?.academic_details?.previous_school,
      gender: student?.personal_information?.gender,
      religion: student?.personal_information?.religion,
      state_of_origin: student?.personal_information?.state_of_origin,
      local_government_area:
        student?.personal_information?.local_government_area,
      "hostel_room-number": student?.accommodation?.room,
      hostel_block: student?.accommodation?.block,
      date_of_birth: formatDateToYYYYMMDD(student?.personal_information?.dob),
      guardian_contact_details: student?.guardian_information?.contact_number,
      guardian_first_name: student?.guardian_information?.first_name,
      guardian_last_name: student?.guardian_information?.last_name,
      guardian_email_address: student?.guardian_information?.email,
      guardian_relationship_with_student:
        student?.guardian_information?.relationship_with_student,
      residential_address: student?.contact_information?.residential_address,
      contact_details: student?.contact_information?.contact_number,
      student_medication: student?.medical_information?.medication,
      student_emergency_contact:
        student?.medical_information?.emergency_contact,
      student_allergies: student?.medical_information?.allergies,
      "student_special_needs/disabilities":
        student?.additional_information?.disabilities,
      student_nature_of_disability:
        student?.additional_information?.nature_of_disability,
      additional_student_medication:
        student?.additional_information?.medication,
      class: student?.academic_details?.class?.["_id"],
    };

    reset({ ...formData });
    setIsStudentActive(student.is_active);
  };
  React.useEffect(() => {
    const student = currentSubjectData.data?.students?.[0];
    if (student) {
      setFormValues(student);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSubjectData.data]);

  return (
    <ErrorBoundary fallback="Unexpected Error">
      <StudentInfoContext.Provider
        value={{ register, watch, errors, classData: classData.data?.classes }}
      >
        <Container headerTitle="Student">
          <>
            {currentSubjectData.isLoading ? (
              <Spinner />
            ) : currentSubjectData.isError &&
              isAccessDeniedError(currentSubjectData.error) ? (
              <PermissionDeniedState message="You don't have permission to view this student." />
            ) : !currentSubjectData.data?.students[0] ? (
              <Spinner />
            ) : (
              <div className="bg-white p-10">
                <BioUpdate
                  regNo={studentRegId}
                  firstName={
                    studentDataFromBackend?.students[0]?.personal_information
                      ?.first_name ?? ""
                  }
                  lastName={
                    studentDataFromBackend?.students[0]?.personal_information
                      ?.last_name ?? ""
                  }
                />
                <EditPersonalInformation />
                <EditContactInformation />
                <EditGuardianInformation />
                <EditAcademicDetails />
                <AcademicProgressionHistory
                  history={
                    studentDataFromBackend?.students[0]?.academic_details
                      ?.progression_history ?? []
                  }
                />
                <EditHostelAccommodation />
                <EditMedicalInformation />
                <EditAdditionalInformation />
                <div className="flex justify-between flex-col lg:flex-row gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
                  <div className="w-96">
                    <h4 className="text-Text-high-emphasis font-semibold">
                      Student Status
                    </h4>
                    <p className="text-sm tracking-tight text-gray-800">
                      This will be displayed on your organization profile.
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col lg:flex-row flex-wrap">
                    <div className="flex items-center gap-3">
                      <span>Inactive</span>
                      <label
                        htmlFor="toggle"
                        className={`flex items-center cursor-pointer`}
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="toggle"
                            className="sr-only"
                            onChange={toggle}
                            checked={isStudentActive}
                          />
                          <div
                            className={`block ${
                              isStudentActive
                                ? "bg-secondary-green-500"
                                : "bg-gray-600"
                            } w-14 h-8 rounded-full`}
                          ></div>
                          <div
                            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                              isStudentActive
                                ? "transform translate-x-full"
                                : ""
                            }`}
                          ></div>
                        </div>
                      </label>
                      <span>Active</span>
                    </div>
                    <p className="text-sm mt-4 mb-2">
                      <span className="font-bold">Active:</span> This student is
                      currently enrolled in the school
                    </p>
                    <p className="text-sm">
                      <span className="font-bold">Inactive:</span> This student
                      is not currently enrolled in the school
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-6">
                  <DashboardButton
                    variant="primary"
                    className="font-semibold px-7 ml-0"
                    onClick={handleSubmit(onSubmit)}
                  >
                    <LoadingState
                      label="Update"
                      isSubmitting={isPendingExistingStudent}
                    />
                  </DashboardButton>
                </div>
                {contextHolder}
              </div>
            )}
          </>
        </Container>
      </StudentInfoContext.Provider>
    </ErrorBoundary>
  );
}

type ProgressionHistoryEntry = NonNullable<
  StudentDataWithActive["academic_details"]["progression_history"]
>[number];

const getHistoryClassName = (
  classInfo: ProgressionHistoryEntry["from_class"] | undefined
) => {
  if (!classInfo || typeof classInfo === "string") return "Not available";
  const section = classInfo.other_section ?? classInfo.section;
  return section ? `${classInfo.name} - ${section}` : classInfo.name;
};

function AcademicProgressionHistory({
  history,
}: {
  history: ProgressionHistoryEntry[];
}) {
  const sortedHistory = [...history].sort(
    (first, second) =>
      new Date(second.processed_at).getTime() -
      new Date(first.processed_at).getTime()
  );

  return (
    <section className="flex justify-between flex-col lg:flex-row gap-16 pb-16 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Academic progression history
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          A permanent record of term advancement, promotion, repetition, and
          graduation decisions.
        </p>
      </div>
      <div className="flex-1 overflow-x-auto">
        {sortedHistory.length === 0 ? (
          <p className="rounded border p-5 text-sm text-gray-800">
            No progression decisions have been recorded for this student yet.
          </p>
        ) : (
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-grey-50 text-xs uppercase text-gray-800">
              <tr>
                <th className="p-3">From</th>
                <th className="p-3">To</th>
                <th className="p-3">Decision</th>
                <th className="p-3">Average</th>
                <th className="p-3">Processed</th>
              </tr>
            </thead>
            <tbody>
              {sortedHistory.map(entry => (
                <tr
                  key={`${entry.from_session}-${entry.from_term}-${entry.processed_at}`}
                  className="border-t"
                >
                  <td className="p-3">
                    <div className="font-semibold">
                      {entry.from_session}, {entry.from_term}
                    </div>
                    <div className="text-xs text-gray-800">
                      {getHistoryClassName(entry.from_class)}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold">
                      {entry.to_session}, {entry.to_term}
                    </div>
                    <div className="text-xs text-gray-800">
                      {entry.decision === "graduated"
                        ? "Graduated"
                        : getHistoryClassName(entry.to_class)}
                    </div>
                  </td>
                  <td className="p-3 capitalize">{entry.decision}</td>
                  <td className="p-3">
                    {entry.result_average === undefined
                      ? "Not available"
                      : `${entry.result_average}%`}
                  </td>
                  <td className="p-3">
                    {new Date(entry.processed_at).toLocaleDateString("en-NG")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

function BioUpdate({
  regNo,
  firstName,
  lastName,
}: {
  regNo: string;
  firstName: string;
  lastName: string;
}) {
  return (
    <div className="flex gap-4 justify-between pb-7 mb-8 border-b-2 border-border-colour-light">
      <div>
        <h3 className="text-Text-high-emphasis text-2xl font-semibold tracking-tight">
          {firstName} {lastName}
        </h3>
        <span className="text-base text-gray-800 font-medium">
          Registration Number:
          {regNo}
        </span>
      </div>
      <Link href={DASHBOARD_STUDENT} className="flex items-center gap-2">
        <Icon icon="teenyicons:arrow-left-solid" />
        Back to Students
      </Link>
    </div>
  );
}
export function formatDateToYYYYMMDD(isoString: string) {
  return isoString?.split("T")[0];
}
