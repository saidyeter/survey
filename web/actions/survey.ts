'use server'

import { revalidatePath } from 'next/cache'
import { finishSurvey, startSurvey } from '@/lib/source-api'
import { redirect } from 'next/navigation'
import { TNewSurveyValidationSchema, } from '@/lib/types'
import { createNewSurvey } from '@/lib/source-api'


export async function create(data: TNewSurveyValidationSchema) {
    console.log(1);

    const result = await createNewSurvey(data)
    console.log('on server', result);

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
