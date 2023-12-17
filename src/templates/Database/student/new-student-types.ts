import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { z } from "zod";

export const NewStudentSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  middle_name: z.string().min(1, "First Name is required"),
  last_name: z
    .string()
    .min(1, "Last Name is required")
    .min(8, "Last Name must have more than 8 characters"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  local_government_area: z.string().min(1, "Local government area is required"),
  state_of_origin: z.string().min(1, "State of origin is required"),
  residential_address: z.string().min(1, "Residential address is required"),
  nationality: z.string().min(1, "Nationality is required"),
  gender: z.string().min(1, "Gender is required"),
  guardian_first_name: z.string().min(1, "Guardian's first name is required"),

  contact_details: z.string().min(1, "Contact detail is required"),

  guardian_last_name: z.string().min(1, "Guardian's last name is required"),
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
  class: z.string().min(1, "Class is required"),
  extracurricular_activities: z
    .string()
    .min(1, "Extracurricular activities is required"),

  graduation_year: z.string().min(1, "Graduation year is required"),
  enrollment_year: z.string().min(1, "Enrollment year is required"),
  previous_school_attended: z
    .string()
    .min(1, "Previous school attended is required"),
});

type NewStudentFieldValues = {
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: string;
  state_of_origin: string;
  nationality: string;
  gender: string;
  local_government_area: string;
  residential_address: string;
  religion: string;
  contact_details: string;
  guardian_first_name: string;
  guardian_last_name: string;
  guardian_relationship_with_student: string;
  guardian_contact_details: string;
  guardian_email_address: string;
  class: string;
  extracurricular_activities: string;
  graduation_year: string;
  enrollment_year: string;
  previous_school_attended: string;
};
export type NewStudentContextType = {
  register: UseFormRegister<NewStudentFieldValues>;
  errors: FieldErrors<NewStudentFieldValues>;
  watch: UseFormWatch<NewStudentFieldValues>;
};

export type NewStudentSchemaType = z.infer<typeof NewStudentSchema>;
