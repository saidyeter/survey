'use server'

import { revalidatePath } from 'next/cache'
import { removeQuestion } from '@/lib/source-api'


export async function remove(surveyId: number, questionId: number) {
    const result = await removeQuestion(questionId)
    revalidatePath('/admin/new-survey/' + surveyId)
    return result;
}
