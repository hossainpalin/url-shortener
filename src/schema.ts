import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" }),
});

export const urlSchema = z.object({
  originalUrl: z.string().min(5, { message: "URL is required field" }),
});

export type User = z.infer<typeof userSchema>;
export type Url = z.infer<typeof urlSchema>;
