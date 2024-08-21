import { EnumTokens } from '@/shared/types/auth'
import { gql } from '@apollo/client'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import client from './app/(providers)/ApolloProvider/ui/apollo-client'
import { logout } from './features/auth/model/auth.model'
import { locales } from './navigation'
import { removeFromStorage } from './shared/api/auth/auth.helper'

const nextIntlMiddleware = createIntlMiddleware({
	locales,
	defaultLocale: 'ru'
})

const GET_NEW_TOKEN = gql`
	query getNewToken {
		getNewToken {
			accessToken
			user {
				email
				roles
			}
		}
	}
`

const fetchNewTokenFromApollo = async () => {
	try {
		const { data } = await client.query({
			query: GET_NEW_TOKEN
		})
		return data?.getNewToken?.accessToken
	} catch (error) {
		console.error('Error fetching new token from Apollo:', error)
		return null
	}
}

export default async function (req: NextRequest) {
	const { url, cookies, nextUrl } = req
	const localeMatch = url.match(/^\/([a-z]{2})\//)
	const locale = localeMatch ? localeMatch[1] : 'ru'
	const path = nextUrl.pathname
	const publicRoutes = [
		`/${locale}/auth/login`,
		`/${locale}/auth/sign-up`,
		`/${locale}/`,
		`/${locale}/offer`
	]

	const isProtectedRoute = path.startsWith(`/${locale}/d`)
	const isPublicRoute = publicRoutes.includes(path)
	const isOnboardingPage = path === `/${locale}`
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	if (!refreshToken) {
		removeFromStorage()
	}

	if (isPublicRoute) {
		return nextIntlMiddleware(req)
	}
	if (isOnboardingPage && refreshToken) {
		return NextResponse.redirect(new URL(`/${locale}/d`, nextUrl))
	}
	if (isProtectedRoute && !accessToken) {
		const newAccessToken = await fetchNewTokenFromApollo()
		if (newAccessToken) {
			const response = NextResponse.next()
			response.cookies.set(EnumTokens.ACCESS_TOKEN, newAccessToken)
			return response
		}
		logout()
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
		'/d'
	]
}
