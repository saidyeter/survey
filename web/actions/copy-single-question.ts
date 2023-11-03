'use server'

import { revalidatePath } from 'next/cache'
import { copySingleQuestion } from '@/lib/source-api'


export async function copySingle(surveyId: number, questionId: number) {
    const result = await copySingleQuestion(surveyId, questionId)
    revalidatePath('/admin/new-survey/' + surveyId)
    return result;
}
