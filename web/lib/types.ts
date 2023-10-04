import { z } from "zod";

export const signInSchema = z
  .object({
    email: z.string().email("Hatalı E-Posta"),
    password: z.string(),
  })

export type TSignInSchema = z.infer<typeof signInSchema>;
