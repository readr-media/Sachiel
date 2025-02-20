import { NextResponse } from 'next/server'

type ProxyRequestBody = {
  fileUrl: string
  signedCookie: string
}

export async function POST(request: Request) {
  try {
    const { fileUrl, signedCookie }: ProxyRequestBody = await request.json()

    if (!fileUrl || !signedCookie) {
      return NextResponse.json(
        { error: 'Missing fileUrl or signedCookie in request body' },
        { status: 400 }
      )
    }

    const gcsResponse = await fetch(fileUrl, {
      headers: {
        Cookie: signedCookie,
      },
    })

    if (!gcsResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch file from GCS: ${gcsResponse.statusText}` },
        { status: gcsResponse.status }
      )
    }

    return new NextResponse(gcsResponse.body, {
      status: 200,
      headers: {
        'Content-Type':
          gcsResponse.headers.get('Content-Type') ?? 'application/octet-stream',
        'Content-Disposition':
          gcsResponse.headers.get('Content-Disposition') ?? 'attachment',
      },
    })
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json({ error: 'Proxy server error' }, { status: 500 })
  }
}
