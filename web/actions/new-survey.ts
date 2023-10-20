'use server'
 
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { newSurveyValidationSchema } from '@/lib/types'
import { createNewSurvey } from '@/lib/source-api'


export async function create(formData: FormData) {
    'use server'

    const parseResult= newSurveyValidationSchema.safeParse({
        name: formData.get('name'),
        desc: formData.get('desc')
    })
    if (parseResult.success) {
        const result = await createNewSurvey(parseResult.data)


        console.log('on server', result);

        if (result) {
            revalidatePath('/admin')
            redirect('/admin/new-survey/' + result.id)
        }
    }
}
