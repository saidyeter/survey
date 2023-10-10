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


export const partipiciantValidationSchema = z
  .object({
    email: z.string().email("Hatalı E-Posta"),
    code: z.string().length(2, "Sadece 2 hane girin"),
  })

export type TPartipiciantValidationSchema = z.infer<typeof partipiciantValidationSchema>;


export const partipiciantValidationResponseSchema = z
  .object({
    participationTicket: z.string(),
  })

export type TPartipiciantValidationResponseSchema = z.infer<typeof partipiciantValidationResponseSchema>;


export const questionSchema = z
  .object({
    id: z.number(),
    orderNumber: z.number(),
    text: z.string(),
    descriptiveAnswer: z.string().nullable(),
    active: z.boolean(),
    surveyId: z.number(),
    required: z.boolean(),
    answerType: z.string(),
    a: z.string(),
    b: z.string(),
    c: z.string().nullable(),
    d: z.string().nullable(),
    e: z.string().nullable(),
    f: z.string().nullable(),
    g: z.string().nullable(),
    h: z.string().nullable(),
    i: z.string().nullable(),
    j: z.string().nullable(),
    k: z.string().nullable(),
    l: z.string().nullable(),
    m: z.string().nullable(),
    n: z.string().nullable(),
    o: z.string().nullable(),
    p: z.string().nullable(),
    q: z.string().nullable(),
    r: z.string().nullable(),
    s: z.string().nullable(),
    t: z.string().nullable(),
    u: z.string().nullable(),
    v: z.string().nullable(),
    w: z.string().nullable(),
    x: z.string().nullable(),
    y: z.string().nullable(),
    z: z.string().nullable(),
  })

export const questionsResponseSchema = z.object({
  questions: questionSchema.array()
})


export type TQuestionsResponseSchema = z.infer<typeof questionsResponseSchema>;

export const questionAnswerSchema = z
  .object({
    questionId: z.number(),
    answer: z.string(),
    answerDesc: z.string().nullable(),
  })

export const questionAnswersResponseSchema = z.object({
  answers: questionAnswerSchema.array()
})


export type TQuestionAnswersResponseSchema = z.infer<typeof questionAnswersResponseSchema>;

