import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(2, "Password must have more than 8 characters"),
});

export type FormSchemaType = z.infer<typeof formSchema>;
