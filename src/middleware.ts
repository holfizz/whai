import { EnumTokens } from '@/shared/types/auth' // Импортируйте ваш EnumTokens
import { gql } from '@apollo/client'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import client from './app/(providers)/ApolloProvider/ui/apollo-client'
import { logout } from './features/auth/model/auth.model'
import { locales } from './navigation'

const nextIntlMiddleware = createIntlMiddleware({
	locales,
	defaultLocale: 'ru'
})

// Запрос GraphQL для получения нового токена
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

// Функция для получения токенов с сервера
const fetchNewToken = async (refreshToken: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${refreshToken}`
				}
			}
		)
		if (!response.ok) throw new Error('Failed to refresh token')
		const data = await response.json()
		return data.accessToken
	} catch (error) {
		console.error('Error fetching new token:', error)
		return null
	}
}

// Функция для получения нового токена через Apollo Client
const fetchNewTokenFromApollo = async () => {
	try {
		const { data } = await client.query({
			query: GET_NEW_TOKEN
		})
		return data.getNewToken.accessToken
	} catch (error) {
		console.error('Error fetching new token from Apollo:', error)
		return null
	}
}

export default async function (req: NextRequest) {
	const { url, cookies, nextUrl } = req
	const localeMatch = url.match(/^\/([a-z]{2})\//)
	const locale = localeMatch ? localeMatch[1] : 'ru'
	const isHomePage = nextUrl.pathname === `/${locale}`
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
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
			let newAccessToken = await fetchNewToken(refreshToken)
			if (!newAccessToken) {
				newAccessToken = await fetchNewTokenFromApollo()
			}

			if (newAccessToken) {
				const response = NextResponse.next()
				response.cookies.set(EnumTokens.ACCESS_TOKEN, newAccessToken)
				return response
			}
			logout()
			return redirectToLogin(false, req, locale)
		}
	}

	if (isHomePage && accessToken && refreshToken) {
		return NextResponse.redirect(new URL(`/${locale}/d`, url))
	}
	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(`/${locale}/d`, url))
	}
	if (isDashboardPage && !refreshToken) {
		return NextResponse.redirect(new URL(`/${locale}/auth/login`, url))
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

const redirectToLogin = (
	isAdminPage: boolean,
	req: NextRequest,
	locale: string
) => {
	return NextResponse.redirect(
		new URL(isAdminPage ? `/${locale}/404` : `/${locale}/auth/login`, req.url)
	)
}
