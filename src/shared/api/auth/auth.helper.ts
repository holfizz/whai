import Cookies from 'js-cookie'

export const getAuthStateFromStorage = () => {
	if (typeof window !== 'undefined') {
		return JSON.parse(localStorage.getItem('authState') || '{}')
	}
}

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: process.env.CLIENT_DOMAIN,
		sameSite: 'strict',
		expires: 1
	})
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN, { domain: process.env.CLIENT_DOMAIN })
	Cookies.remove(EnumTokens.REFRESH_TOKEN, {
		domain: process.env.CLIENT_DOMAIN
	})
}
