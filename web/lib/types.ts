import { z } from "zod";

export const signInSchema = z
  .object({
    email: z.string().email("Hatalı E-Posta"),
    password: z.string(),
  })

export type TSignInSchema = z.infer<typeof signInSchema>;


export const getUserchema = z
  .object({
    email: z.string(),
    id: z.number().transform(t => t.toString()),
    displayName: z.string(),
  })
export type TGetUserSchema = z.infer<typeof getUserchema>;
