import { ZodError, z } from "zod";

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


const survey = z
  .object({
    id: z.number(),
    name: z.string(),
    startDate: z.string().transform(s => new Date(s)),
    endDate: z.string().transform(s => new Date(s)).nullable(),
    description: z.string(),
    status: z.string()
  })

export const surveySchema = survey
export type TSurveySchema = z.infer<typeof surveySchema>;


export const getActiveSurveyResponseSchema = survey
export type TGetActiveSurveyResponseSchema = z.infer<typeof getActiveSurveyResponseSchema>;


export const getSurveysResponseSchema = z.object({
  surveys: survey.array()
})
export type TGetSurveysResponseSchema = z.infer<typeof getSurveysResponseSchema>;


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
    descriptiveAnswer: z.number().nullable(),
    surveyId: z.number(),
    required: z.boolean(),
    answerType: z.number().transform(a => {
      switch (a) {
        case 0: return 'single'
        case 1: return 'multiple'
        case 2: return 'yesNo'

      }
      throw new ZodError([])

    })
  })
export const answerSchema = z
  .object({
    id: z.number(),
    text: z.string(),
    label: z.string(),
    questionId: z.number(),
  })

export const questionsResponseSchema = z.object({
  survey: z.object({
    question: questionSchema,
    answers: answerSchema.array()
  }).array()

})


export type TQuestionsResponseSchema = z.infer<typeof questionsResponseSchema>;

export const questionAnswerSchema = z
  .object({
    questionId: z.number(),
    answerId: z.number(),
    answerDesc: z.string().nullable(),
  })

export const questionAnswersResponseSchema = z.object({
  answers: questionAnswerSchema.array()
})


export type TQuestionAnswersResponseSchema = z.infer<typeof questionAnswersResponseSchema>;

export const surveyDetailSchema = z.object({
  survey: surveySchema,
  surveyId: z.number(),
  allParticipantCount: z.number(),
  participationCount: z.number(),
  questionDetails: z.object({
    question: questionSchema,
    answeredCount: z.number(),
    answerDetails: z.object({
      id: z.number().optional(),
      label: z.string().max(1),
      text: z.string(),
      choosenCount: z.number()
    }).array()
  }).array()
})
export type TSurveyDetailSchema = z.infer<typeof surveyDetailSchema>;
