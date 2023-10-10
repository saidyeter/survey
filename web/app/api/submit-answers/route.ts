import { getQuestions, submitAnswers } from "@/lib/source-api"
import { TQuestionAnswersResponseSchema } from "@/lib/types"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
    const cookieStore = cookies()
    const ticket = cookieStore.get('ticket')

    if (!ticket || !ticket.value) {
        const cookie = `ticket=; max-age:0; path=/; samesite=lax; httponly`
        return Response.json({}, { status: 401, headers: { 'Set-Cookie': cookie }, })
    }
    const formData = await request.formData()
    // console.log(formData);
    const answerArray: TQuestionAnswersResponseSchema = {
        answers: []
    }
    for (const pair of formData.entries()) {
        answerArray.answers.push({
            questionId: parseInt(pair[0]),
            answer: pair[1].toString(),
            answerDesc: null
        })
    }

    const res = await submitAnswers(ticket.value, answerArray)

    if (!res) {
        return Response.json({}, { status: 400 })
    }

    
    return Response.redirect('http://localhost:3000/survey/completed')
}