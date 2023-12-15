import { validateParticipant } from "@/lib/source-api"
import { partipiciantValidationSchema } from "@/lib/types"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const result = partipiciantValidationSchema.safeParse(body)
  if (!result.success) {
    return  NextResponse.json({}, { status: 400 })
  }
  const res = await validateParticipant(result.data.email, result.data.code)

  if (!res) {
    return  NextResponse.json({}, { status: 400 })
  }
  else if (res.participationTicket.length == 0) {
    return  NextResponse.json({}, { status: 208 })
  }

  const cookie = `ticket=${res.participationTicket}; max-age:${60 * 60}; path=/; samesite=lax; httponly`
  return  NextResponse.json({}, { status: 200, headers: { 'Set-Cookie': cookie }, })
}