'use server'

import { revalidatePath } from 'next/cache'
import { TNewQuestionSchema, newQuestionSchema } from '@/lib/types'
import { createNewQuestion } from '@/lib/source-api';


export async function create(surveyId: number, data: TNewQuestionSchema) {
    console.log("data", data);

    if (await createNewQuestion(surveyId, data)) {

        revalidatePath('/admin/new-survey/' + surveyId)
        return {
            success: true,
        }
    }
    return {
        success: false,
    }
}
