import { z } from "zod";

const phoneRegex = /^[0-9]{8,15}$/;

// Define a Zod schema for form validation
export const contactSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters"),
  email_address: z.string().email("Invalid email address format"),
  phone_number: z
    .string()
    .refine(value => phoneRegex.test(value), "Invalid phone number format"),
  subject: z
    .string()
    .min(2, "Subject must be at least 2 characters")
    .max(100, "Subject must be at most 100 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type FormData = z.infer<typeof contactSchema>;
