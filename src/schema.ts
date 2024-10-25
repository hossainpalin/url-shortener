import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({ message: "Username is required field" })
    .min(5, { message: "Username must be at least 5 characters long" }),
});

export const urlSchema = z.object({
  originalUrl: z.string({ message: "Original URL is required field" }).min(1),
});

export type User = z.infer<typeof userSchema>;
export type Url = z.infer<typeof urlSchema>;
