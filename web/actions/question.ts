'use server'

import { revalidatePath } from 'next/cache'
import { TNewQuestionSchema } from '@/lib/types'
import { createNewQuestion, copySingleQuestion, lowerDownQuestion, removeQuestion } from '@/lib/source-api'
import { raiseUpQuestion } from '@/lib/source-api'
import { cookies } from 'next/headers'


export async function remove(questionId: number) {
    const result = await removeQuestion(questionId)
    revalidatePath('/admin/survey/pre/')
    return result;
}


export async function raiseUp(questionId: number) {
    const cookieStore = cookies()
    console.log(cookieStore.getAll());

    const result = await raiseUpQuestion(questionId)
    revalidatePath('/admin/survey/pre/')
    return result;
}

export async function create(data: TNewQuestionSchema) {
    console.log("data", data);

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
