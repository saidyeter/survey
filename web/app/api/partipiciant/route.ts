import { validateParticipant } from "@/lib/source-api"
import { partipiciantValidationSchema } from "@/lib/types"

export async function POST(request: Request) {
    const body = await request.json()
    const result = partipiciantValidationSchema.safeParse(body)
    if (!result.success) {
        return Response.json({}, { status: 400 })
    }
    const res = await validateParticipant(result.data.email, result.data.code)

    if (!res) {
        return Response.json({}, { status: 400 })
    }
    else if (res.participationTicket.length == 0) {
        return Response.json({}, { status: 208 })
    }

    const cookie = `ticket=${res.participationTicket}; max-age:${60 * 60}; path=/; samesite=lax; httponly`
    return Response.json({}, { status: 200, headers: { 'Set-Cookie': cookie }, })
}