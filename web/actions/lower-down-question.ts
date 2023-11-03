'use server'

import { revalidatePath } from 'next/cache'
import { lowerDownQuestion } from '@/lib/source-api'


export async function lowerDown(surveyId: number, questionId: number) {
    const result = await lowerDownQuestion(questionId)
    revalidatePath('/admin/new-survey/' + surveyId)
    return result;
}
