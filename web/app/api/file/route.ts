import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  searchParams.append('search', searchParams.get('q') ?? '')
  searchParams.append('orderDirection', searchParams.get('od') ?? '')
  searchParams.append('orderColumn', searchParams.get('oc') ?? '')

  const response = await fetch(process.env.DB_API_URL + '/participant/download?' + searchParams.toString(), {
    method: "GET",
    headers: {
      'Authorization': process.env.DB_API_KEY ?? ''
    },
    cache: 'no-cache'
  })
  const t = await response.text()
  const responseBuffer = Buffer.from(t, 'base64')

  const headers = new Headers();
  headers.append('Content-Disposition', 'attachment; filename="filename.xlsx"');
  headers.append('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  return new Response(responseBuffer, { headers });
}