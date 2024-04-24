import { NextResponse } from 'next/server'

import { ENV } from '@/constants/config'

export async function GET() {
  let body
  if (ENV === 'prod') {
    body = `User-agent: * 
Allow: / `
  } else {
    body = `User-agent: * 
Disallow: /`
  }

  const res = new NextResponse(body)
  res.headers.set('Content-Type', 'text/plain')

  return res
}
