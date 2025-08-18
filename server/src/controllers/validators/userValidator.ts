import { z } from "zod";


export const createUserSchema = z.object({
  sub: z.string(),
  "https://ai-reviewer.com/email": z.string().email(),
  "https://ai-reviewer.com/nickname": z.string(),
});


export const getUserSchema = z.object({
  sub: z.string().min(1, "sub is required"),
});
