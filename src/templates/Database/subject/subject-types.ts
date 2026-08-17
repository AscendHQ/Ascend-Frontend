/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { z } from "zod";

export const newSubjectSchema = z.object({
  subject_name: z.string().min(1, "Subject name is required"),
  subject_code: z.string().min(1, "Subject code is required"),
  level: z.string().refine(value => value === "junior" || value === "senior", {
    message: "Level must be 'Junior' or 'Senior'",
  }),
  type: z.string().refine(value => value === "core" || value === "elective", {
    message: "Type must be 'Core' or 'Elective'",
  }),
  juniorClasses: z.array(
    z.object({
      label: z.string(),
      checked: z.boolean(),
      class_id: z.string(),
    })
  ),
  seniorClasses: z.array(
    z.object({
      label: z.string(),
      checked: z.boolean(),
      class_id: z.string(),
    })
  ),
  name: z.any(),
});
export const subjectInfoSchema = z.object({
  subject_name: z.string().min(1, "Subject name is required"),
  subject_code: z.string().min(1, "Subject code is required"),
  type: z.string().refine(value => value === "core" || value === "elective", {
    message: "Type must be 'Core' or 'Elective'",
  }),
});

type NewSubjectFieldValues = {
  subject_name: string;
  subject_code: string;
  level: string;
  type: string;
  juniorClasses: { label: string; class_id: string; checked: boolean }[];
  seniorClasses: { label: string; class_id: string; checked: boolean }[];
  name?: any;
};

export type NewSubjectContextType = {
  register: UseFormRegister<NewSubjectFieldValues>;
  errors: FieldErrors<NewSubjectFieldValues>;
  watch: UseFormWatch<NewSubjectFieldValues>;
  juniorFields: FieldArrayWithId<
    {
      subject_name: string;
      subject_code: string;
      level: string;
      juniorClasses: { label: string; checked: boolean; class_id: string }[];
      name?: any;
    },
    "juniorClasses"
  >[];
  seniorFields: FieldArrayWithId<
    {
      subject_name: string;
      subject_code: string;
      level: string;
      seniorClasses: { label: string; checked: boolean; class_id: string }[];
      name?: any;
    },
    "seniorClasses"
  >[];
};

export type NewSubjectSchemaType = z.infer<typeof newSubjectSchema>;
export type SubjectInfoSchemaType = z.infer<typeof subjectInfoSchema>;

export type Student = {
  _id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  registration_number: string;
  is_registered?: boolean;
};

export type ClassInfo = {
  _id: string;
  name: string;
  students: Student[];
};

export type SubjectRegisterContextType = {
  students: ClassInfo[];
};
type Subject = {
  _id: string;
  name: string;
  type: "core" | "elective";
};

export type studentRegistrationType = {
  registration: {
    _id: string;
    selected_subjects: Subject[];
  } | null;
  subjects: Subject[];
};
