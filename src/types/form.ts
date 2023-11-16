import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine(value => {
      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasDigit = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      return hasLowerCase && hasUpperCase && hasDigit && hasSpecialChar;
    }, "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"),
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

type BioDataFieldValues = {
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
  class: z.string().min(1, "Class is required"),
  leadership_role: z.string().min(1, "Leadership role is required"),
  extracurricular_activities: z
    .string()
    .min(1, "Extracurricular activities is required"),
  "awards_&_recognition": z
    .string()
    .min(1, "Awards or recognition is required"),
  graduation_year: z.string().min(1, "Graduation year is required"),
  enrollment_year: z.string().min(1, "Enrollment year is required"),
  previous_school_attended: z
    .string()
    .min(1, "Previous school attended is required"),
});

type AcademicInfoFieldValues = {
  class: string;
  leadership_role: string;
  extracurricular_activities: string;
  "awards_&_recognition": string;
  graduation_year: string;
  enrollment_year: string;
  previous_school_attended: string;
};

export const newSubjectSchema = z.object({
  subject_name: z.string().min(1, "Subject name is required"),
  subject_code: z.string().min(1, "Subject code is required"),
  description: z.string().min(1, "Description is required"),
  classes_offering: z.string().min(1, "Classes offering is required"),
  teachers: z.string().min(1, "Teachers is required"),
  status: z.string().min(1, "Status is required"),
  hours_per_week: z.string().min(1, "Hours per week is required"),
});

type NewSubjectFieldValues = {
  subject_name: string;
  subject_code: string;
  description: string;
  classes_offering: string;
  teachers: string;
  status: string;
  hours_per_week: string;
};

export const classInfoSchema = z.object({
  class_name: z.string().min(1, "Class name is required"),
  level: z.string({ required_error: "Level is required" }),
});

type ClassInfoFieldValues = {
  class_name: string;
  level: string;
};

export const newClassSchema = z.object({
  class_name: z.string().min(1, "Class name is required"),
  // level: z.string().min(1, "Level is required"),
  level: z
    .string({ required_error: "Level is required" })
    .refine(value => value === "junior" || value === "senior", {
      message: "Level must be 'Junior' or 'Senior'",
    }),
});

type NewClassFieldValues = {
  class_name: string;
  level: string;
};

export const newLessonPlanSchema = z.object({
  lesson_title: z.string().min(1, "Subject name is required"),
  subject: z.string().min(1, "Subject name is required"),
  class: z.string().min(1, "Subject name is required"),
  duration: z.string().min(1, "Subject name is required"),
  lesson_plan_overview: z.string().min(1, "Subject name is required"),
  weekly_plan_objectives: z.string().min(1, "Subject name is required"),
});

type NewLessonPlanFieldValues = {
  lesson_title: string;
  subject: string;
  class: string;
  duration: string;
  lesson_plan_overview: string;
  weekly_plan_objectives: string;
};

export const lessonPlanInfoSchema = z.object({
  lesson_title: z.string().min(1, "Subject name is required"),
  subject: z.string().min(1, "Subject name is required"),
  class: z.string().min(1, "Subject name is required"),
  duration: z.string().min(1, "Subject name is required"),
  lesson_plan_overview: z.string().min(1, "Subject name is required"),
  weekly_plan_objectives: z.string().min(1, "Subject name is required"),
});

type LessonPlanInfoFieldValues = {
  lesson_title: string;
  subject: string;
  class: string;
  duration: string;
  lesson_plan_overview: string;
  weekly_plan_objectives: string;
};

export const newHostelSchema = z.object({
  hostel_name: z.string().min(1, "Subject name is required"),
  capacity: z.string().min(1, "Subject name is required"),
  hostel_type: z.string().min(1, "Subject name is required"),
  staff_name: z.string().min(1, "Subject name is required"),
  contact_detail: z.string().min(1, "Subject name is required"),
  amount_to_be_paid: z.string().min(1, "Subject name is required"),
  period_of_payment: z.string().min(1, "Subject name is required"),
  room_type: z.string().min(1, "Subject name is required"),
  "Notes&Comments": z.string().min(1, "Subject name is required"),
});

type NewHostelFieldValues = {
  hostel_name: string;
  capacity: string;
  hostel_type: string;
  staff_name: string;
  contact_detail: string;
  amount_to_be_paid: string;
  period_of_payment: string;
  room_type: string;
  "Notes&Comments": string;
};

export const hostelInfoSchema = z.object({
  hostel_name: z
    .string()
    .min(2, { message: "Hostel name should be at least 2 characters long" }),
  capacity: z
    .number()
    .int()
    .min(1, { message: "Capacity should be a positive integer" }),
  hostel_type: z
    .string()
    .min(2, { message: "Hostel type should be at least 2 characters long" }),
  staff_name: z
    .string()
    .min(2, { message: "Staff name should be at least 2 characters long" }),
  contact_detail: z
    .string()
    .min(5, { message: "Contact detail should be at least 5 characters long" }),
  amount_to_be_paid: z
    .number()
    .int()
    .min(1, { message: "Amount to be paid should be a positive integer" }),
  period_of_payment: z.string().min(2, {
    message: "Period of payment should be at least 2 characters long",
  }),
  room_type: z
    .string()
    .min(2, { message: "Room type should be at least 2 characters long" }),
  "Notes&Comments": z.string().min(5, {
    message: "Notes & comments should be at least 5 characters long",
  }),
});

type HostelInfoFieldValues = {
  hostel_name: string;
  capacity: number;
  hostel_type: string;
  staff_name: string;
  contact_detail: string;
  amount_to_be_paid: number;
  period_of_payment: string;
  room_type: string;
  "Notes&Comments": string;
};

export const newStaffSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name should be at least 2 characters long" }),

  last_name: z
    .string()
    .min(2, { message: "Last name should be at least 2 characters long" }),
  sex: z.string().min(1, { message: "Sex is required" }),

  home_address: z
    .string()
    .min(10, { message: "Home address should be at least 10 characters long" }),

  phone_number: z
    .string()
    .regex(/^\+?\d{10,12}$/, { message: "Invalid phone number" }),

  job_title: z
    .string()
    .min(2, { message: "Job title should be at least 2 characters long" }),
  educational_qualification: z.string().min(2, {
    message: "Educational qualification must be selected",
  }),
  department: z
    .string()
    .min(2, { message: "Department should be at least 2 characters long" }),

  date_of_birth: z.string().nonempty("Date of birth is required"),
  denomination: z.string().min(2, { message: "Denomination is required" }),
  status: z.string().min(2, { message: "Teacher's status is required" }),
  type: z.string().min(2, { message: "Teacher's type is required" }),
  staff_no: z.string(),
});

type NewStaffFieldValues = {
  first_name: string;
  last_name: string;
  sex: string;
  phone_number: string;
  home_address: string;
  job_title: string;
  department: string;
  educational_qualification: string;

  date_of_birth: string;
  denomination: string;
  status: string;
  type: string;
  staff_no: string;
};
export const editStaffSchema = z.object({
  surname: z.string().optional(),
  other_names: z.string().optional(),
  sex: z.string().optional(),
  address: z.string().optional(),
  phone_number: z.string().optional(),
  post: z.string().optional(),
  qualifications: z.string().optional(),
  department: z.string().optional(),
  denomination: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
});

export type EditStaffFieldValues = {
  surname?: string;
  other_names?: string;
  sex?: string;
  phone_number?: string;
  address?: string;
  post?: string;
  department?: string;
  qualifications?: string;
  denomination?: string;
  status?: string;
  type?: string;
};

export const newTeacherOfficialInfoSchema = z.object({
  staff_ID: z
    .string()
    .min(2, { message: "Staff ID should be at least 2 characters long" }),
  job_title: z
    .string()
    .min(2, { message: "Job title should be at least 2 characters long" }),
  educational_qualification: z.string().min(2, {
    message: "Educational qualification should be at least 2 characters long",
  }),
  department: z
    .string()
    .min(2, { message: "Department should be at least 2 characters long" }),
  staff_category: z
    .string()
    .min(2, { message: "Staff category should be at least 2 characters long" }),
});

export const newTeacherPermissionSchema = z.object({
  students_create: z.boolean({
    errorMap: () => ({ message: "You must accept Terms and Conditions" }),
  }),
});

type NewTeacherPermissionFieldValues = {
  students_create: boolean;
};

// zodresolver
export type BioDataContextType = {
  register: UseFormRegister<BioDataFieldValues>;
  errors: FieldErrors<BioDataFieldValues>;
};

export type AcademicInfoContextType = {
  register: UseFormRegister<AcademicInfoFieldValues>;
  errors: FieldErrors<AcademicInfoFieldValues>;
};

export type NewSubjectContextType = {
  register: UseFormRegister<NewSubjectFieldValues>;
  errors: FieldErrors<NewSubjectFieldValues>;
};

export type NewClassContextType = {
  register: UseFormRegister<NewClassFieldValues>;
  errors: FieldErrors<NewClassFieldValues>;
};

export type ClassInfoContextType = {
  register: UseFormRegister<ClassInfoFieldValues>;
  errors: FieldErrors<ClassInfoFieldValues>;
};

export type NewLessonPlanContextType = {
  register: UseFormRegister<NewLessonPlanFieldValues>;
  errors: FieldErrors<NewLessonPlanFieldValues>;
  open: boolean;
};

export type LessonPlanInfoContextType = {
  register: UseFormRegister<LessonPlanInfoFieldValues>;
  errors: FieldErrors<LessonPlanInfoFieldValues>;
  open: boolean;
};

export type NewHostelContextType = {
  register: UseFormRegister<NewHostelFieldValues>;
  errors: FieldErrors<NewHostelFieldValues>;
};

export type HostelInfoContextType = {
  register: UseFormRegister<HostelInfoFieldValues>;
  errors: FieldErrors<HostelInfoFieldValues>;
};

export type NewStaffContextType = {
  register: UseFormRegister<NewStaffFieldValues>;
  errors: FieldErrors<NewStaffFieldValues>;
};

export type EditStaffContextType = {
  register: UseFormRegister<EditStaffFieldValues>;
  errors: FieldErrors<EditStaffFieldValues>;
};

export type NewTeacherPermissionContextType = {
  register: UseFormRegister<NewTeacherPermissionFieldValues>;
  errors: FieldErrors<NewTeacherPermissionFieldValues>;
};

// useform
export type FormSchemaType = z.infer<typeof formSchema>;

export type StudentBioDataSchemaType = z.infer<typeof studentBioDataSchema>;

export type StudentAcademicInfoSchemaType = z.infer<
  typeof studentAcademicInfoSchema
>;

export type NewSubjectSchemaType = z.infer<typeof newSubjectSchema>;

export type NewClassSchemaType = z.infer<typeof newClassSchema>;

export type ClassInfoSchemaType = z.infer<typeof classInfoSchema>;

export type NewLessonPlanSchemaType = z.infer<typeof newLessonPlanSchema>;

export type LessonPlanInfoSchemaType = z.infer<typeof lessonPlanInfoSchema>;

export type NewHostelSchemaType = z.infer<typeof newHostelSchema>;

export type HostelInfoSchemaType = z.infer<typeof hostelInfoSchema>;

export type NewStaffSchemaType = z.infer<typeof newStaffSchema>;

export type EditStaffSchemaType = z.infer<typeof editStaffSchema>;
export type UpdateStaffSchemaType = Omit<
  EditStaffSchemaType,
  "qualifications"
> & {
  qualifications: string[];
};

export type NewTeacherPermissionSchemaType = z.infer<
  typeof newTeacherPermissionSchema
>;
