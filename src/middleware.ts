import { EnumTokens } from '@/shared/types/auth'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales } from './navigation'
import { removeFromStorage } from './shared/api/auth/auth.helper'

const nextIntlMiddleware = createIntlMiddleware({
	locales,
	defaultLocale: 'ru'
})

// const GET_NEW_TOKEN = gql`
// 	query getNewToken {
// 		getNewToken {
// 			accessToken
// 			user {
// 				email
// 				roles
// 			}
// 		}
// 	}
// `

// const fetchNewTokenFromApollo = async () => {
// 	try {
// 		const { data, error } = await client.query({
// 			query: GET_NEW_TOKEN
// 		})
// 		return { data: data?.getNewToken?.accessToken, error }
// 	} catch (error) {
// 		console.error('Error fetching new token from Apollo:', error)
// 		return null
// 	}
// }

export default async function (req: NextRequest) {
	const { url, cookies, nextUrl } = req
	const localeMatch = url.match(/^\/([a-z]{2})\//)
	const locale = localeMatch ? localeMatch[1] : 'ru'
	const path = nextUrl.pathname
	const publicRoutes = [`/${locale}/`, `/${locale}/offer`]

	const isProtectedRoute = path.startsWith(`/${locale}/d`)
	const isPublicRoute = publicRoutes.includes(path)
	const isOnboardingPage = path === `/${locale}`
	const isAuthPage = path.includes('auth')

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const isAuthTokens = !!accessToken && !!refreshToken
	if (!refreshToken) {
		removeFromStorage()
	}

	if (isPublicRoute) {
		return nextIntlMiddleware(req)
	}
	if (isOnboardingPage && isAuthTokens) {
		return NextResponse.redirect(new URL(`/${locale}/d`, nextUrl))
	}
	if (isAuthPage && isAuthTokens) {
		return NextResponse.redirect(new URL(`/${locale}/d`, nextUrl))
	}
	if (isProtectedRoute && !isAuthTokens) {
		return NextResponse.redirect(new URL(`/${locale}/auth/login`, nextUrl))
	}

	return nextIntlMiddleware(req)
}

export const config = {
	matcher: [
		'/',
		'/:locale',
		'/(ru|en)/:path*',
		'/((?!_next|_vercel|.*\\..*).*)',
		'/d/:path*',
		'/d',
		'/auth/:path*'
	]
}
