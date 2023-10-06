import { z } from "zod";

export const signInSchema = z
  .object({
    email: z.string().email("Hatalı E-Posta"),
    password: z.string(),
  })

export type TSignInSchema = z.infer<typeof signInSchema>;


export const getUserSchema = z
  .object({
    email: z.string(),
    id: z.number().transform(t => t.toString()),
    displayName: z.string(),
  })
export type TGetUserSchema = z.infer<typeof getUserSchema>;




export const getActiveSurveyResponseSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    startDate: z.string().transform(s => new Date(s)),
    description: z.string(),
  })
export type TGetActiveSurveyResponseSchema = z.infer<typeof getActiveSurveyResponseSchema>;
