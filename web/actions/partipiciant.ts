'use server'

import { revalidatePath } from 'next/cache'
import { TNewParticipantSchema, } from '@/lib/types'
import { createNewPartipiciant, deletePartipiciant, updatePartipiciant } from '@/lib/source-api'
import { redirect } from 'next/navigation'


export async function remove(id: number) {
    const result = await deletePartipiciant(id)
    if (result) {
        revalidatePath('/admin/member/')
        redirect('/admin/member/')
    }
    return {
        success: false,
    }
}

export async function edit(id: number, data: TNewParticipantSchema) {
    const result = await updatePartipiciant(id, data)

    if (result) {
        revalidatePath('/admin/member/')
        revalidatePath('/admin/member/id')

        redirect('/admin/member/')
    }
    return {
        success: false,
    }
}


export async function create(data: TNewParticipantSchema) {

    if (await createNewPartipiciant(data)) {
        revalidatePath('/admin/member/')
        redirect('/admin/member/')
    }
    return {
        success: false,
    }
} 