import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const idToken = request.cookies.get('token')?.value

  if (request.url === '/' || request.url === '/login') {
    return NextResponse.next()
  }

  if (!idToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
export const config = {
  matcher: [],
}
