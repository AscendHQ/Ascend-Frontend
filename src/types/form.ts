import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

export const studentDataSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),

  date_of_birth: z.string().min(1, "First Name is required"),
  local_government_area: z.string().min(1, "First Name is required"),
  state_of_origin: z.string().min(1, "First Name is required"),
  residential_address: z.string().min(1, "First Name is required"),
  nationality: z.string().min(1, "First Name is required"),
  guardian: z.string().min(1, "First Name is required"),
  gender: z.string().min(1, "First Name is required"),
  email_address: z.string().email("Invalid email").min(1, "Email is required"),
  contact_details: z.string().min(1, "First Name is required"),
});

type FieldValues = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  state_of_origin: string;
  nationality: string;
  gender: string;
  local_government_area: string;
  residential_address: string;
  email_address: string;
  guardian: string;
  contact_details: string;
};

export type MyContextType = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export type FormSchemaType = z.infer<typeof formSchema>;

export type StudentDataSchemaType = z.infer<typeof studentDataSchema>;
