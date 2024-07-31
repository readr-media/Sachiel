import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const protectRoutes = ['/media', '/social', '/point', '/profile']
  const currentPath = request.nextUrl.pathname
  const isProtectedRoute = protectRoutes.includes(currentPath)

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
