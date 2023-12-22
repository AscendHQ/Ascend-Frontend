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
  level: z.string().refine(value => value === "Junior" || value === "Senior", {
    message: "Level must be 'Junior' or 'Senior'",
  }),
  type: z.string().refine(value => value === "Core" || value === "Elective", {
    message: "Type must be 'Core' or 'Elective'",
  }),
  juniorClasses: z.array(
    z.object({
      label: z.string(),
      checked: z.boolean(),
    })
  ),
  seniorClasses: z.array(
    z.object({
      label: z.string(),
      checked: z.boolean(),
    })
  ),
  name: z.any(),
});

type NewSubjectFieldValues = {
  subject_name: string;
  subject_code: string;
  level: string;
  type: string;
  juniorClasses: { label: string; checked: boolean }[];
  seniorClasses: { label: string; checked: boolean }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      juniorClasses: { label: string; checked: boolean }[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name?: any;
    },
    "juniorClasses"
  >[];
  seniorFields: FieldArrayWithId<
    {
      subject_name: string;
      subject_code: string;
      level: string;
      seniorClasses: { label: string; checked: boolean }[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name?: any;
    },
    "seniorClasses"
  >[];
};

export type NewSubjectSchemaType = z.infer<typeof newSubjectSchema>;
