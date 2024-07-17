import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales } from './navigation'
import { EnumTokens } from '@/shared/types/auth'

const nextIntlMiddleware = createIntlMiddleware({
	locales,
	defaultLocale: 'en'
})

export default function (req: NextRequest) {
	const { url, cookies } = req
	const localeMatch = url.match(/^\/([a-z]{2})\//)
	const locale = localeMatch ? localeMatch[1] : 'ru'
	const isHomePage = url === `http://localhost:3000/${locale}`
	// const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const refreshToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const isAuthPage = url.includes('auth')
	const isDashboardPage = url.includes('/d')
	if (isHomePage) {
		return NextResponse.next()
	}

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(`/${locale}/`, url))
	}

	if (isDashboardPage && !refreshToken) {
		return NextResponse.redirect(new URL(`/${locale}/auth/login`, url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL(`/${locale}/auth/login`, url))
	}
	return nextIntlMiddleware(req)
}

export const config = {
	matcher: ['/', '/(ru|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
}
