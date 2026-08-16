import { Dispatch, SetStateAction } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { z } from "zod";

import { classInfoProp } from "../class/class-types";

export const NewStudentSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  middle_name: z.string().min(1, "Middle Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  local_government_area: z.string().min(1, "Local government area is required"),
  state_of_origin: z.string().min(1, "State of origin is required"),
  residential_address: z.string().min(1, "Residential address is required"),
  gender: z.string().min(1, "Gender is required"),
  guardian_first_name: z.string().min(1, "Guardian's first name is required"),
  contact_details: z.string().min(1, "Contact detail is required"),
  student_allergies: z.string().optional(),
  student_emergency_contact: z
    .string()
    .min(1, "Student's emergency contact is required"),
  student_medication: z.string().optional(),
  guardian_last_name: z.string().min(1, "Guardian's last name is required"),
  student_nature_of_disability: z.string().optional(),
  additional_student_medication: z.string().optional(),
  religion: z.string().min(1, "Religion is required"),
  guardian_relationship_with_student: z
    .string()
    .min(1, "Guardian's relationship with student is required"),
  guardian_contact_details: z
    .string()
    .min(1, "Guardian's contact details is required"),
  guardian_email_address: z
    .string()
    .min(1, "Guardian's email address is required"),
  hostel_block: z.string().min(1, "Hostel block is required"),
  "hostel_room-number": z.string().min(1, "Hostel room number is required"),
  "student_special_needs/disabilities": z.string().optional(),
  class: z.string().min(1, "Class is required"),
  // extracurricular_activities: z
  //   .string()
  //   .min(1, "Extracurricular activities is required"),

  previous_school_attended: z
    .string()
    .min(1, "Previous school attended is required"),
});
export const studentInfoSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  middle_name: z.string().min(1, "Middle Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  local_government_area: z.string().optional(),
  state_of_origin: z.string().optional(),
  residential_address: z.string().min(1, "Residential address is required"),
  gender: z.string().min(1, "Gender is required"),
  guardian_first_name: z.string().min(1, "Guardian's first name is required"),
  contact_details: z.string().min(1, "Contact detail is required"),
  student_allergies: z.string().optional(),
  student_emergency_contact: z
    .string()
    .min(1, "Student's emergency contact is required"),
  student_medication: z.string().optional(),
  guardian_last_name: z.string().min(1, "Guardian's last name is required"),
  student_nature_of_disability: z.string().optional(),
  additional_student_medication: z.string().optional(),
  religion: z.string().min(1, "Religion is required"),
  guardian_relationship_with_student: z
    .string()
    .min(1, "Guardian's relationship with student is required"),
  guardian_contact_details: z
    .string()
    .min(1, "Guardian's contact details is required"),
  guardian_email_address: z
    .string()
    .min(1, "Guardian's email address is required"),
  hostel_block: z.string().min(1, "Hostel block is required"),
  "hostel_room-number": z.string().min(1, "Hostel room number is required"),
  "student_special_needs/disabilities": z.string().optional(),
  class: z.string().min(1, "Class is required"),
  // extracurricular_activities: z
  //   .string()
  //   .min(1, "Extracurricular activities is required"),

  previous_school_attended: z
    .string()
    .min(1, "Previous school attended is required"),
});

type NewStudentFieldValues = {
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  religion: string;
  state_of_origin: string;
  local_government_area: string;

  residential_address: string;
  contact_details: string;

  guardian_first_name: string;
  guardian_last_name: string;
  guardian_relationship_with_student: string;
  guardian_contact_details: string;
  guardian_email_address: string;

  class: string;
  previous_school_attended: string;

  hostel_block: string;
  "hostel_room-number": string;

  student_allergies?: string;
  student_emergency_contact: string;
  student_medication?: string;

  "student_special_needs/disabilities"?: string;
  student_nature_of_disability?: string;
  additional_student_medication?: string;

  // extracurricular_activities: string;
};
type StudentInfoFieldValues = {
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  religion: string;
  state_of_origin?: string;
  local_government_area?: string;

  residential_address: string;
  contact_details: string;

  guardian_first_name: string;
  guardian_last_name: string;
  guardian_relationship_with_student: string;
  guardian_contact_details: string;
  guardian_email_address: string;

  class: string;
  previous_school_attended: string;

  hostel_block: string;
  "hostel_room-number": string;

  student_allergies?: string;
  student_emergency_contact: string;
  student_medication?: string;

  "student_special_needs/disabilities"?: string;
  student_nature_of_disability?: string;
  additional_student_medication?: string;

  // extracurricular_activities: string;
};

export type NewStudentSchemaType = z.infer<typeof NewStudentSchema>;

// type StudentInfoFieldValues = NewStudentFieldValues;
// type StudentInfoFieldValues = Partial<NewStudentFieldValues>;

// export const studentInfoSchema = NewStudentSchema;
// export const studentInfoSchema = NewStudentSchema.partial();

export type StudentInfoContextType = {
  register: UseFormRegister<StudentInfoFieldValues>;
  errors: FieldErrors<StudentInfoFieldValues>;
  watch: UseFormWatch<StudentInfoFieldValues>;
  classData: classInfoProp[];
};

export type StudentInfoSchemaType = z.infer<typeof studentInfoSchema>;

type LocalGovernmentArea = string;

interface State {
  state: string;
  alias: string;
  lgas: LocalGovernmentArea[];
}

export type NigerianStates = State[];

export type showAllStudentContext = {
  totalNumberOfStudent: number;
  currentPage: number;
  limitOfStudent: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export type NewStudentContextType = {
  register: UseFormRegister<NewStudentFieldValues>;
  errors: FieldErrors<NewStudentFieldValues>;
  watch: UseFormWatch<NewStudentFieldValues>;
  classData: classInfoProp[];
};

export type NewStudentData = {
  personal_information: {
    first_name: string;
    middle_name: string;
    last_name: string;
    gender: string;
    dob: string;
    religion: string;
    nationality: string;
    state_of_origin?: string;
    local_government_area?: string;
  };
  contact_information: {
    residential_address: string;
    contact_number: string;
  };
  guardian_information: {
    first_name: string;
    last_name: string;
    relationship_with_student: string;
    contact_number: string;
    email: string;
  };
  academic_details: {
    class: string;
    previous_school: string;
  };
  accommodation: {
    block: string;
    room: string;
  };
  medical_information: {
    allergies: string;
    medication: string;
    emergency_contact: string;
  };
  additional_information: {
    disabilities: string;
    medication: string;
    nature_of_disability: string;
  };
};

// export type BackendStudentData = NewStudentData & {
//   academic_details: {
//     class: { [key: string]: string };
//     previous_school: string;
//   };
//   is_active: boolean;
// };

export type StudentDataWithActive = NewStudentData & {
  academic_details: {
    class: { [key: string]: string };
    previous_school: string;
  };
  is_active: boolean;
  _id: string;
  registration_number: string;
  organization: string;
  is_deleted: string;
};
