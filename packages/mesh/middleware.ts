import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const protectRoutesPattern = [
    /^\/media(\/.*)?$/,
    /^\/social(\/.*)?$/,
    /^\/point(\/.*)?$/,
    /^\/payment(\/.*)?$/,
    /^\/setting(\/.*)?$/,
    /^\/media-backstage(\/.*)?$/,
    /^\/publisher-list(\/.*)?$/,
  ]
  const currentPath = request.nextUrl.pathname
  const isProtectedRoute = protectRoutesPattern.some((pattern) =>
    pattern.test(currentPath)
  )
  if (isProtectedRoute) {
    const cookie = cookies().get('token')?.value
    const userAgent = request.headers.get('user-agent') || ''

    /**
     * Facebook crawler: https://developers.facebook.com/docs/sharing/webmasters/web-crawlers
     * Line crawler: https://help2.line.me/linesearchbot/web/?contentId=50006055&lang=en
     * X(Twitter) crawler: https://developer.x.com/en/docs/x-for-websites/cards/guides/getting-started (URL Crawling & Caching)
     * online crawler user agents: https://github.com/monperrus/crawler-user-agents/blob/master/crawler-user-agents.json
     */
    const isSocialBot =
      /facebookexternalhit|facebookcatalog|Linespider|Twitterbot/.test(
        userAgent
      )

    if (!isSocialBot && !cookie) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons).*)'],
}
