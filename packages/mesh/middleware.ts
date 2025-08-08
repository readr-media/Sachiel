import acceptLanguage from 'accept-language'
import { type NextRequest, NextResponse } from 'next/server'

import { cookieName, fallbackLng, languages } from './app/i18n/settings'
acceptLanguage.languages(languages)

export function middleware(request: NextRequest) {
  let lng
  if (request.cookies.has(cookieName))
    lng = acceptLanguage.get(request.cookies.get(cookieName)!.value)
  if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

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
    const token = request.cookies.get('token')?.value
    const userAgent = request.headers.get('user-agent') || ''

    const isSocialBot =
      /facebookexternalhit|facebookcatalog|Linespider|Twitterbot/.test(
        userAgent
      )

    if (!isSocialBot && !token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
  }

  if (
    !languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !request.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${request.nextUrl.pathname}`, request.url)
    )
  }

  const currentLng =
    languages.find((l) => request.nextUrl.pathname.startsWith(`/${l}`)) || lng

  const response = NextResponse.next()

  response.cookies.set(cookieName, currentLng || lng, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
  })

  // 處理 referer
  if (request.headers.has('referer')) {
    const refererUrl = new URL(request.headers.get('referer') ?? '')
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    )
    if (lngInReferer) {
      response
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons).*)'],
}
