import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";
import { useRouter } from "next/router";
import React from "react";
import { UseFormReset } from "react-hook-form";

import { axiosInstance } from "@/api";
import { DASHBOARD_STUDENT } from "@/config/links";

import {
  NewStudentData,
  NewStudentSchemaType,
  NigerianStates,
  StudentInfoSchemaType,
} from "./student-types";

function useMutateNewStudent(
  toast: NotificationInstance,
  reset: UseFormReset<NewStudentSchemaType>
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: mutateNewStudent, isPending: isPendingAddNewStudent } =
    useMutation({
      mutationFn: (data: NewStudentSchemaType) => {
        return axiosInstance
          .post("/students", transformData(data))
          .then(res => res.data);
      },
      onSuccess: () => {
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">Success!</h3>
          ),
          description: "New Student has been added successfully",
          duration: 3,
          className: "ant-toast",
        });
        reset({});
        queryClient.invalidateQueries({ queryKey: ["allStudent"] });
        router.push(DASHBOARD_STUDENT);
      },
      onError: (error: Error & { response?: { data?: string } }) => {
        toast.open({
          message: (
            <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
          ),
          description:
            error.response?.data ??
            "The student could not be registered. Please try again.",
          duration: 8,
          className: "ant-toast",
        });
      },
    });
  return {
    mutateNewStudent,
    isPendingAddNewStudent,
  };
}

export default useMutateNewStudent;

const url =
  "https://raw.githubusercontent.com/Eniolayo/Nigeria-s-State-and-LGA/main/nigeria-state-and-lgas.json";

const fetchNigeriaStateandLGA = async (): Promise<NigerianStates> =>
  await fetch(url).then(res => {
    if (!res.ok) {
      throw new Error("State and local government data could not be loaded");
    }

    return res.json();
  });

export function useFetchStateAndLGA() {
  const { data: stateAndLGA, isLoading } = useQuery({
    queryKey: ["nigeriaStateandLGA"],
    queryFn: fetchNigeriaStateandLGA,
  });
  const getStatesArray =
    stateAndLGA !== undefined ? stateAndLGA.map(item => item.state) : [];
  return { stateAndLGA, isLoading, getStatesArray };
}

export function transformData(
  originalData: NewStudentSchemaType | StudentInfoSchemaType
): NewStudentData {
  return {
    personal_information: {
      first_name: originalData.first_name,
      middle_name: originalData.middle_name,
      last_name: originalData.last_name,
      gender: originalData.gender.toLowerCase(),
      dob: originalData.date_of_birth,
      religion: originalData.religion.toLowerCase(),
      nationality: "Nigeria",
      state_of_origin: originalData.state_of_origin,
      local_government_area: originalData.local_government_area,
    },
    contact_information: {
      residential_address: originalData.residential_address,
      contact_number: originalData.contact_details,
    },
    guardian_information: {
      first_name: originalData.guardian_first_name,
      last_name: originalData.guardian_last_name,
      relationship_with_student:
        originalData.guardian_relationship_with_student.toLowerCase(),
      contact_number: originalData.guardian_contact_details,
      email: originalData.guardian_email_address,
    },
    academic_details: {
      class: originalData.class,
      previous_school: originalData.previous_school_attended,
    },
    accommodation: {
      block: originalData.hostel_block,
      room: originalData["hostel_room-number"],
    },
    medical_information: {
      allergies: originalData.student_allergies || "",
      medication: originalData.student_medication || "",
      emergency_contact: originalData.student_emergency_contact,
    },
    additional_information: {
      disabilities: originalData["student_special_needs/disabilities"] || "",
      medication: originalData.additional_student_medication || "",
      nature_of_disability: originalData.student_nature_of_disability || "",
    },
  };
}
