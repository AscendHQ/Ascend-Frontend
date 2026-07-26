import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";

import { axiosInstance } from "@/api";

export type LessonRecord = {
  _id: string;
  title: string;
  subject: string;
  class: { _id: string; name: string }[];
  status?: "approved" | "pending" | "rejected" | "archived";
  createdAt: string;
};

const fetchAllLessons = () =>
  axiosInstance
    .get("/lessons")
    .then(res => res.data as { lessons: LessonRecord[]; total_documents: number });

export const useAllLessons = () => {
  return useQuery({
    queryKey: ["allLessons"],
    queryFn: fetchAllLessons,
  });
};

export function useUpdateLessonStatus(toast: NotificationInstance) {
  const queryClient = useQueryClient();

  const { mutate: updateLessonStatus } = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "approved" | "rejected";
    }) => {
      return axiosInstance
        .put(`/lessons/${id}`, { status })
        .then(res => res.data);
    },
    onSuccess: (_, variables) => {
      toast.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">
            Success!
          </h3>
        ),
        description: `Lesson plan has been ${variables.status}`,
        duration: 3,
        className: "ant-toast",
      });
      queryClient.invalidateQueries({ queryKey: ["allLessons"] });
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

  return { updateLessonStatus };
}

export type ClassOption = { _id: string; name: string };
export type SubjectOption = { _id: string; name: string };

const fetchAllClassesForLesson = () =>
  axiosInstance.get("/classes").then(res => res.data);

export const useAllClassesForLesson = () => {
  return useQuery({
    queryKey: ["allClassesForLesson"],
    queryFn: fetchAllClassesForLesson,
  });
};

const fetchAllSubjectsForLesson = () =>
  axiosInstance.get("/subjects").then(res => res.data);

export const useAllSubjectsForLesson = () => {
  return useQuery({
    queryKey: ["allSubjectsForLesson"],
    queryFn: fetchAllSubjectsForLesson,
  });
};

export type CreateLessonPayload = {
  title: string;
  subject: string;
  class_id: string[];
  duration: { number: number; period: "hour" | "week" | "month" };
  lesson_plan: string;
  objectives: string;
};

export function useCreateLesson(toast: NotificationInstance) {
  const queryClient = useQueryClient();

  const { mutate: createLesson, isPending: isCreatingLesson } = useMutation({
    mutationFn: (data: CreateLessonPayload) => {
      return axiosInstance.post("/lessons", data).then(res => res.data);
    },
    onSuccess: () => {
      toast.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">
            Success!
          </h3>
        ),
        description: "Lesson plan has been added successfully",
        duration: 3,
        className: "ant-toast",
      });
      queryClient.invalidateQueries({ queryKey: ["allLessons"] });
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

  return { createLesson, isCreatingLesson };
}

export type LessonDetail = {
  _id: string;
  title: string;
  subject: string;
  class: { _id: string; name: string }[];
  duration: { number: number; period: string };
  lesson_plan: string;
  objectives: string;
  status?: string;
};

const fetchLessonById = (id: string) =>
  axiosInstance.get(`/lessons/${id}`).then(res => res.data as LessonDetail);

export const useLessonById = (id: string) => {
  return useQuery({
    queryKey: ["lessonPlanInfo", id],
    queryFn: () => fetchLessonById(id),
    enabled: Boolean(id),
  });
};

export function useUpdateLesson(toast: NotificationInstance) {
  const queryClient = useQueryClient();

  const { mutate: updateLesson, isPending: isUpdatingLesson } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Omit<CreateLessonPayload, "class_id"> & { class_id: string[] };
    }) => {
      return axiosInstance.put(`/lessons/${id}`, data).then(res => res.data);
    },
    onSuccess: (_, variables) => {
      toast.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">
            Success!
          </h3>
        ),
        description: "Lesson plan has been updated successfully",
        duration: 3,
        className: "ant-toast",
      });
      queryClient.invalidateQueries({ queryKey: ["allLessons"] });
      queryClient.invalidateQueries({
        queryKey: ["lessonPlanInfo", variables.id],
      });
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

  return { updateLesson, isUpdatingLesson };
}
