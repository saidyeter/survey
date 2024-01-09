import { validateParticipant } from "@/lib/source-api"
import { partipiciantValidationSchema } from "@/lib/types"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const body = await request.json()
  const result = partipiciantValidationSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({}, { status: 400 })
  }
  const res = await validateParticipant(result.data.email, result.data.code)

  if (!res) {
    return NextResponse.json({}, { status: 400 })
  }
  else if (res.participationTicket.length == 0) {
    return NextResponse.json({}, { status: 208 })
  }

  const cookieStore = cookies()
  cookieStore.set('ticket', res.participationTicket, {
    httpOnly: true,
    maxAge: 60 * 60,
    path: '/',
    sameSite: 'lax'
  })

  // const cookie = `ticket=${res.participationTicket}; max-age:${60 * 60}; path=/; samesite=lax; httponly`
  // return NextResponse.json({}, { status: 200, headers: { 'Set-Cookie': cookie }, })
  return NextResponse.json({}, { status: 200 })
}