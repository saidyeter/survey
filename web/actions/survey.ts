'use server'

import { revalidatePath } from 'next/cache'
import { finishSurvey, getQuestions, removePreSurvey, startSurvey, submitAnswers, updatePreSurveyInfo } from '@/lib/source-api'
import { redirect } from 'next/navigation'
import { TNewSurveyValidationSchema, TQuestionAnswersFormSchema, questionAnswersFormSchema, questionAnswersReqSchema, } from '@/lib/types'
import { createNewSurvey } from '@/lib/source-api'
import { cookies } from 'next/headers'


export async function removePre() {
    const result = await removePreSurvey()

    if (result) {
        revalidatePath('/admin/')
        revalidatePath('/admin/survey/pre')

        redirect('/admin/')
    }
    return {
        success: false,
    }
}

export async function submitAttendeeAnswers(data: TQuestionAnswersFormSchema) {
    const cookieStore = cookies()
    const ticket = cookieStore.get('ticket')
    if (!ticket?.value) {
        return {
            success: false,
            reason: 'no ticket acquired'
        }
    }

    var reqData = questionAnswersReqSchema.safeParse(data);
    if (!reqData.success) {
        return {
            success: false,
            reason: 'invalid data'
        }
    }

    const res = await submitAnswers(ticket.value, reqData.data)
    if (!res) {
        return {
            success: false,
            reason: 'server error'
        }
    }
    redirect('/survey/completed')
}

export async function getSurveyQuestions() {
    const cookieStore = cookies()
    const ticket = cookieStore.get('ticket')
    if (!ticket?.value) {
        return {
            success: false,
            reason: 'no ticket acquired'
        }
    }

    const res = await getQuestions(ticket?.value)

    if (!res) {
        return {
            success: false,
            reason: 'no ticket or active no survey'
        }
    }

    return {
        success: true,
        data: res
    }
}

export async function create(data: TNewSurveyValidationSchema) {
    const result = await createNewSurvey(data)
    if (result) {
        revalidatePath('/admin')
        redirect('/admin/survey/pre/')
    }

}

export async function start() {
    const result = await startSurvey()
    if (result) {
        revalidatePath('/admin/survey/pre/')
        revalidatePath('/admin/survey/running/')
        revalidatePath('/admin')
        redirect('/admin/')
    }
}

export async function finish() {
    const result = await finishSurvey()
    if (result) {
        revalidatePath('/admin/survey/pre/')
        revalidatePath('/admin/survey/running/')
        revalidatePath('/admin')
        redirect('/admin/')
    }

}

export async function update(data: TNewSurveyValidationSchema) {
    if (await updatePreSurveyInfo(data)) {
        revalidatePath('/admin/survey/pre')
        redirect('/admin/survey/pre')
    }
    return {
        success: false,
    }
}