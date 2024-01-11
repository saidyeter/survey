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


const survey = z
  .object({
    id: z.number(),
    name: z.string(),
    startDate: z.string().transform(s => new Date(s)).nullable(),
    endDate: z.string().transform(s => new Date(s)).nullable(),
    description: z.string(),
    status: z.number().transform((v, ctx) => {
      switch (v) {
        case 0: return 'pre'
        case 1: return 'running'
        case 2: return 'ended'
      }
      ctx.addIssue({
        message: 'Expected 0 or 1 or 2, received: ' + v,
        code: "custom"
      })
      return z.NEVER
    })
  })

export const surveySchema = survey
export type TSurveySchema = z.infer<typeof surveySchema>;


export const getPreSurveyResponseSchema = survey

export const getActiveSurveyResponseSchema = z.object({
  survey: survey,
  startedCount: z.number().optional().nullable(),
  finishedCount: z.number().optional().nullable(),
  totalParticipants: z.number().optional().nullable(),
})
export type TGetActiveSurveyResponseSchema = z.infer<typeof getActiveSurveyResponseSchema>;


export const getSurveysResponseSchema = z.object({
  surveys: survey.array()
})
export type TGetSurveysResponseSchema = z.infer<typeof getSurveysResponseSchema>;


export const partipiciantValidationSchema = z
  .object({
    email: z.string().email("Hatalı E-Posta"),
    code: z.string().min(10, "10 haneden az olamaz"),
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
    surveyId: z.number(),
    required: z.boolean(),
    answerType: z.number().transform((a, ctx) => {
      switch (a) {
        case 0: return 'single'
        case 1: return 'multiple'
        case 2: return 'yesNo'
      }
      ctx.addIssue({
        message: 'Expected 0 or 1 or 2, received: ' + a,
        code: "custom"
      })
      return z.NEVER
    })
  })


export const answerSchema = z
  .object({
    id: z.number(),
    text: z.string(),
    label: z.string(),
    questionId: z.number(),
  })

export const qnaSchema = z.object({
  question: questionSchema,
  answers: answerSchema.array()
})
export type TQnASchema = z.infer<typeof qnaSchema>;

export const participantAnswer = z.object({
  participationId: z.number(),
  questionId: z.number(),
  answerId: z.number(),
})
export const questionsResponseSchema = z.object({
  survey: qnaSchema.array(),
  alreadyRespondedAnswers: participantAnswer.array()
})



export type TQuestionsResponseSchema = z.infer<typeof questionsResponseSchema>;


export const questionAnswerSchema = z
  .object({
    questionId: z.number(),
    answerId: z.string().optional(),
    answerDesc: z.string().optional(),
  })

export const questionAnswersFormSchema = z.object({
  answers: questionAnswerSchema.array()
})


export type TQuestionAnswersFormSchema = z.infer<typeof questionAnswersFormSchema>;


export const questionAnswerReqSchema = z
  .object({
    questionId: z.number(),
    answerId: z.string().transform(a => parseInt(a)).optional(),
    answerDesc: z.string().optional(),
  })

export const questionAnswersReqSchema = z.object({
  answers: questionAnswerReqSchema.array()
})


export type TQuestionAnswersReqSchema = z.infer<typeof questionAnswersReqSchema>;

export const questionDetailSchema = z.object({
  question: questionSchema,
  answeredCount: z.number(),
  answerDetails: z.object({
    id: z.number().optional(),
    label: z.string().max(1),
    text: z.string(),
    choosenCount: z.number()
  }).array()
});
export type TQuestionDetailSchema = z.infer<typeof questionDetailSchema>;

export const surveyDetailSchema = z.object({
  survey: surveySchema,
  surveyId: z.number(),
  allParticipantCount: z.number(),
  participationCount: z.number(),
  questionDetails: questionDetailSchema.array()
})
export type TSurveyDetailSchema = z.infer<typeof surveyDetailSchema>;

export const checkNewSurveyIsAllowedResponse = z.object({
  allowed: z.boolean()
})

export type TCheckNewSurveyIsAllowed = z.infer<typeof checkNewSurveyIsAllowedResponse>



export const newSurveyValidationSchema = z
  .object({
    name: z.string().min(5, 'En az 5 karakter giriniz'),
    desc: z.string().optional(),
  })

export type TNewSurveyValidationSchema = z.infer<typeof newSurveyValidationSchema>;


export const getSurveySchema = z.object({
  survey: surveySchema,
  qnas: qnaSchema.array()
})
export type TGetSurveySchema = z.infer<typeof getSurveySchema>;

export const checkPreSurveyExistsScheme = z.object({
  exists: z.boolean(),
  id: z.number().optional().nullable()
})


export const newQuestionSchema = z
  .object({
    text: z.string({ required_error: 'Soru icerigi zorunlu alandir' }).min(5, '5 karakterden fazla girin'),
    descriptiveAnswer: z.string().nullable(),
    isDescriptiveAnswerWanted: z.boolean().default(false),
    isrequired: z.boolean().default(true),
    answerType: z.string(),
    answers: z.object({
      text: z.string().min(2, 'En az 2 karakter girilmelidir'),
    }).array().min(2, 'En az 2 cevap eklenmelidir')
      .transform(d => {
        const labels = 'ABCDEFGHJKLMNOPRSTUVYZ'

        return (
          d.map((v, i) => {
            return {
              text: v.text,
              label: labels[i]
            }
          })
        )
      })
  }).refine(d => (d.isDescriptiveAnswerWanted && d.descriptiveAnswer && d.answers.some(a => a.label == d.descriptiveAnswer)) || !d.isDescriptiveAnswerWanted, {
    message: 'Aciklama girilmesi isteniyorsa, aciklama istenen secenek isaretlenmelidir',
    path: ['descriptiveAnswer']
  })
export type TNewQuestionSchema = z.infer<typeof newQuestionSchema>;

export const newParticipantSchema = z.object({
  title: z.string(),
  email: z.string(),
  pType: z.string(),
  status: z.string(),
  code: z.string(),
  city: z.string(),
  subcity: z.string(),
})
export type TNewParticipantSchema = z.infer<typeof newParticipantSchema>;



export const participantSchema = z.object({
  id: z.number(),
  title: z.string(),
  email: z.string(),
  pType: z.string(),
  status: z.string(),
  code: z.string(),
  city: z.string(),
  subcity: z.string(),
})
export type TParticipantSchema = z.infer<typeof participantSchema>;

export const getParticipantsResponseSchema = z.object({
  list: participantSchema.array(),
  nextPage: z.number(),
  pageSize: z.number(),
  totalCount: z.number()
})

export type TGetParticipantsResponseSchema = z.infer<typeof getParticipantsResponseSchema>;

const updateOnRunningQuestionAnswerSchema = z.object({
  id: z.number(),
  text: z.string(),
  label: z.string()
})

export const updateOnRunningQuestionRequestSchema = z.object({
  text: z.string(),
  required:z.boolean(),
  answers: updateOnRunningQuestionAnswerSchema.array()
})
export type TUpdateOnRunningQuestionRequestSchema = z.infer<typeof updateOnRunningQuestionRequestSchema>;