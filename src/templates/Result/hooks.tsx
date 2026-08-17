import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";
import { useRouter } from "next/router";

import { axiosInstance } from "@/api";
import { DASHBOARD_RESULT_INFO } from "@/config/links";

export type ResultRecord = {
  _id: string;
  student: {
    _id: string;
    registration_number?: string;
    personal_information: {
      first_name: string;
      last_name: string;
    };
  };
  session: string;
  term: string;
  status?: "approved" | "pending" | "rejected" | "archived";
  createdAt: string;
};

const fetchAllResults = (params: {
  session?: string;
  term?: string;
}) =>
  axiosInstance
    .get("/results", { params: { ...params, limit: 1000 } })
    .then(res => res.data as { results: ResultRecord[]; total_documents: number });

export const useAllResults = (params: { session?: string; term?: string }) => {
  return useQuery({
    queryKey: ["allResults", params],
    queryFn: () => fetchAllResults(params),
    enabled: Boolean(params.session && params.term),
  });
};

export type StudentOption = {
  _id: string;
  registration_number: string;
  personal_information: { first_name: string; last_name: string };
  academic_details: { class: { _id: string; name: string } | string };
};

export type SubjectOption = {
  _id: string;
  name: string;
  type?: "core" | "elective";
};

const fetchAllStudents = () =>
  axiosInstance
    .get("/students?is_active=true&limit=1000")
    .then(
      res =>
        res.data as { students: StudentOption[]; total_documents: number }
    );

export const useAllStudentsForResult = () => {
  return useQuery({
    queryKey: ["allStudentsForResult"],
    queryFn: fetchAllStudents,
  });
};

export const useStudentSubjectsForResult = ({
  studentId,
  classId,
  session,
  term,
}: {
  studentId: string;
  classId: string;
  session: string;
  term: string;
}) => {
  return useQuery({
    queryKey: ["studentSubjectsForResult", studentId, classId, session, term],
    queryFn: () =>
      axiosInstance
        .get(`/registrations/${studentId}`, {
          params: { class_id: classId, session, term },
        })
        .then(
          res =>
            res.data as {
              registration: { selected_subjects: SubjectOption[] } | null;
            }
        ),
    enabled: Boolean(studentId && classId && session && term),
  });
};

export type ResultBlockInput = {
  subject: string;
  mid_term_test: number;
  ca_score: number;
  exam_score: number;
  total: number;
  grade: "A" | "B" | "C" | "D" | "F";
};

export type CreateResultPayload = {
  student: string;
  session: string;
  term: string;
  blocks: ResultBlockInput[];
};

export function useCreateResult(toast: NotificationInstance) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createResult, isPending: isCreatingResult } = useMutation({
    mutationFn: (data: CreateResultPayload) => {
      return axiosInstance.post("/results", data).then(res => res.data);
    },
    onSuccess: response => {
      toast.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">
            Success!
          </h3>
        ),
        description: "Result has been saved successfully",
        duration: 3,
        className: "ant-toast",
      });
      queryClient.invalidateQueries({ queryKey: ["allResults"] });
      if (response?._id) {
        router.push(DASHBOARD_RESULT_INFO(response._id));
      }
    },
    onError: (error: Error & { response?: { data: string } }) => {
      toast.open({
        message: (
          <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
        ),
        description: error.response?.data ?? "Something went wrong",
        duration: 8,
        className: "ant-toast",
      });
    },
  });

  return { createResult, isCreatingResult };
}

export type ResultBlockRecord = {
  _id: string;
  subject: { _id: string; name: string } | string;
  mid_term_test: number;
  ca_score: number;
  exam_score: number;
  total: number;
  grade: string;
};

export type ResultDetail = {
  _id: string;
  student: {
    _id: string;
    registration_number: string;
    personal_information: { first_name: string; last_name: string };
    academic_details: { class: { _id: string; name: string } | string };
  };
  session: string;
  term: string;
  status?: string;
  blocks: ResultBlockRecord[];
};

const fetchResultById = (id: string) =>
  axiosInstance.get(`/results/${id}`).then(res => res.data as ResultDetail);

export const useResultById = (id: string) => {
  return useQuery({
    queryKey: ["resultInfo", id],
    queryFn: () => fetchResultById(id),
    enabled: Boolean(id),
  });
};
