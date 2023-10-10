import { getQuestions } from "@/lib/source-api"
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const cookieStore = cookies()
    const ticket = cookieStore.get('ticket')

    if (!ticket || !ticket.value) {
        const cookie = `ticket=; max-age:0; path=/; samesite=lax; httponly`
        return Response.json({}, { status: 401, headers: { 'Set-Cookie': cookie }, })
    }

    const res = await getQuestions(ticket.value)

    if (!res) {
        return Response.json({}, { status: 400 })
    }

    return Response.json(res, { status: 200 })
}