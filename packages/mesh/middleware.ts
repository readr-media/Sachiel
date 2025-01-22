import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const protectRoutesPattern = [
    /^\/media(\/.*)?$/,
    /^\/social(\/.*)?$/,
    /^\/point(\/.*)?$/,
    /^\/profile(\/.*)?$/,
    /^\/payment(\/.*)?$/,
    /^\/setting(\/.*)?$/,
    /^\/collection(\/.*)?$/,
    /^\/publisher-list(\/.*)?$/,
  ]
  const currentPath = request.nextUrl.pathname
  const isProtectedRoute = protectRoutesPattern.some((pattern) =>
    pattern.test(currentPath)
  )
  if (isProtectedRoute) {
    const cookie = cookies().get('token')?.value
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons).*)'],
}
