import { DASHBOARD_PAGES } from '@/shared/config/pages-url.config'
import { EnumTokens } from '@/shared/types/auth'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
	const { url, cookies } = request
	const localeMatch = url.match(/^\/([a-z]{2})\//)
	const locale = localeMatch ? localeMatch[1] : 'ru'
	const isHomePage = url === `http://localhost:3000/${locale}`
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const isAuthPage = url.includes(`/auth`)
	console.log(refreshToken)
	if (isHomePage) {
		return
	}
	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(`${DASHBOARD_PAGES.HOME}`, url))
	}
	if (isAuthPage) {
		return NextResponse.next()
	}
	if (!refreshToken) {
		return NextResponse.redirect(new URL(`/${locale}/auth/sign-up`, url))
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/:locale/auth/:path*', '/:locale/i/:path*'],
}
