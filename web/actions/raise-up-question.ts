'use server'

import { revalidatePath } from 'next/cache'
import { raiseUpQuestion } from '@/lib/source-api'


export async function raiseUp(surveyId: number, questionId: number) {
    const result = await raiseUpQuestion(questionId)
    revalidatePath('/admin/new-survey/' + surveyId)
    return result;
}
