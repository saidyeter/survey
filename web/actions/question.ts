'use server'

import { revalidatePath } from 'next/cache'
import { TNewQuestionSchema, TUpdateOnRunningQuestionRequestSchema } from '@/lib/types'
import { createNewQuestion, copySingleQuestion, lowerDownQuestion, removeQuestion, updateSingleQuestionOnRunningSurvey, updateSingleQuestionOnPreSurvey } from '@/lib/source-api'
import { raiseUpQuestion } from '@/lib/source-api'
import { redirect } from 'next/navigation'


export async function remove(questionId: number) {
    const result = await removeQuestion(questionId)
    revalidatePath('/admin/survey/pre/')
    return result;
}


export async function raiseUp(questionId: number) {
    const result = await raiseUpQuestion(questionId)
    revalidatePath('/admin/survey/pre/')
    return result;
}

export async function create(data: TNewQuestionSchema) {

    if (await createNewQuestion(data)) {

        revalidatePath('/admin/survey/pre/')
        return {
            success: true,
        }
    }
    return {
        success: false,
    }
}

export async function lowerDown(questionId: number) {
    const result = await lowerDownQuestion(questionId)
    revalidatePath('/admin/survey/pre/')
    return result;
}


export async function copySingle(questionId: number) {
    const result = await copySingleQuestion(questionId)
    revalidatePath('/admin/survey/pre/')
    return result;
}


export async function updateRunning(questionId: number, req: TUpdateOnRunningQuestionRequestSchema) {
     if (await updateSingleQuestionOnRunningSurvey(questionId, req)) {

        revalidatePath('/admin/survey/running/')
        revalidatePath('/survey/questions')
        redirect('/admin/survey/running/')
      
    }
    return {
        success: false,
    }
}

export async function updatePre(questionId: number, req: TNewQuestionSchema) {
     if (await updateSingleQuestionOnPreSurvey(questionId, req)) {
        revalidatePath('/admin/survey/pre')
        revalidatePath('/survey/questions')
        redirect('/admin/survey/pre')
    }
    return {
        success: false,
    }
}
