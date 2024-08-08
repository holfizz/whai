import { EnumTokens } from '@/shared/types/auth' // Импортируйте ваш EnumTokens
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales } from './navigation'

const nextIntlMiddleware = createIntlMiddleware({
	locales,
	defaultLocale: 'en'
})

export default async function (req: NextRequest) {
	const { url, cookies } = req
	const localeMatch = url.match(/^\/([a-z]{2})\//)
	const locale = localeMatch ? localeMatch[1] : 'ru'
	const isHomePage = url === `http://localhost:3000/${locale}`
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	let accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const isAuthPage = url.includes('auth')
	const isDashboardPage = url.includes('/d')
	if (!refreshToken) {
		if (!isAuthPage) {
			req.cookies.delete(EnumTokens.ACCESS_TOKEN)
			req.cookies.delete(EnumTokens.REFRESH_TOKEN)
			return redirectToLogin(false, req, locale)
		}
	} else {
		if (isAuthPage) {
			return NextResponse.redirect(new URL(`/${locale}/`, url))
		}

		if (isDashboardPage && !accessToken) {
			return NextResponse.redirect(new URL(`/${locale}/auth/login`, url))
		}
	}
	if (isHomePage) {
		return NextResponse.next()
	}
	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(`/${locale}/`, url))
	}
	if (isDashboardPage && !refreshToken) {
		return NextResponse.redirect(new URL(`/${locale}/auth/login`, url))
	}

	return nextIntlMiddleware(req)
}

export const config = {
	matcher: [
		'/',
		'/(ru|en)/:path*',
		'/((?!_next|_vercel|.*\\..*).*)',
		'/d/:path*'
	]
}
const redirectToLogin = (
	isAdminPage: boolean,
	req: NextRequest,
	locale: string
) => {
	return NextResponse.redirect(
		new URL(isAdminPage ? `/${locale}/404` : `/${locale}/auth/login`, req.url)
	)
}
