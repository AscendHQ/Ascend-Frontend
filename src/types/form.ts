import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

export const studentBioDataSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z
    .string()
    .min(1, "Last Name is required")
    .min(8, "Last Name must have more than 8 characters"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  local_government_area: z.string().min(1, "Local government area is required"),
  state_of_origin: z.string().min(1, "State of origin is required"),
  residential_address: z.string().min(1, "Residential address is required"),
  nationality: z.string().min(1, "Nationality is required"),
  guardian: z.string().min(1, "Guardian is required"),
  gender: z.string().min(1, "Gender is required"),
  guardian_first_name: z.string().min(1, "Guardian's first name is required"),
  email_address: z
    .string()
    .email("Invalid email")
    .min(1, "Student's email is required"),
  contact_details: z.string().min(1, "Contact detail is required"),
  student_allergies: z.string().min(1, "Student's Allergies is required"),
  student_emergency_contact: z
    .string()
    .min(1, "Student's emergency contact is required"),
  student_medication: z.string().min(1, "Student's medication is required"),
  guardian_last_name: z.string().min(1, "Guardian's last name is required"),
  student_nature_of_disability: z
    .string()
    .min(1, "Student's nature of disability is required"),
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
  "student_special_needs/disabilities": z
    .string()
    .min(1, "Student's special needs/disabilities is required"),
});

export type BioDataFieldValues = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  state_of_origin: string;
  nationality: string;
  gender: string;
  student_nature_of_disability: string;
  local_government_area: string;
  residential_address: string;
  email_address: string;
  guardian: string;
  religion: string;
  contact_details: string;
  guardian_first_name: string;
  guardian_last_name: string;
  guardian_relationship_with_student: string;
  guardian_contact_details: string;
  guardian_email_address: string;
  additional_student_medication?: string;
  hostel_block: string;
  student_medication: string;
  student_allergies: string;
  student_emergency_contact: string;
  "hostel_room-number": string;
  "student_special_needs/disabilities": string;
};

export const studentAcademicInfoSchema = z.object({
  class: z.string().min(1, "First Name is required"),
  leadership_role: z.string().min(1, "First Name is required"),
  extracurricular_activities: z.string().min(1, "First Name is required"),
  "awards_&_recognition": z.string().min(1, "First Name is required"),
  graduation_year: z.string().min(1, "First Name is required"),
  enrollment_year: z.string().min(1, "First Name is required"),
  previous_school_attended: z.string().min(1, "First Name is required"),
});

export type AcademicInfoFieldValues = {
  class: string;
  leadership_role: string;
  extracurricular_activities: string;
  "awards_&_recognition": string;
  graduation_year: string;
  enrollment_year: string;
  previous_school_attended: string;
};
export type BioDataContextType = {
  register: UseFormRegister<BioDataFieldValues>;
  errors: FieldErrors<BioDataFieldValues>;
};

export type AcademicInfoContextType = {
  register: UseFormRegister<AcademicInfoFieldValues>;
  errors: FieldErrors<AcademicInfoFieldValues>;
};

export type FormSchemaType = z.infer<typeof formSchema>;

export type StudentBioDataSchemaType = z.infer<typeof studentBioDataSchema>;

export type StudentAcademicInfoSchemaType = z.infer<
  typeof studentAcademicInfoSchema
>;
