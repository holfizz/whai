import Cookies from 'js-cookie'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/const/token'
import { IAuthResponse, ITokens } from '@/entities/Profile/model/profile.types'

export const getAccessToken = () => {
	const accessToken = Cookies.get(ACCESS_TOKEN)
	return accessToken || null
}
export const getRefreshToken = () => {
	const refreshToken = Cookies.get(REFRESH_TOKEN)
	return refreshToken || null
}
export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveTokenStorage = (data: ITokens) => {
	Cookies.set(ACCESS_TOKEN, data.accessToken)
	Cookies.set(REFRESH_TOKEN, data.refreshToken)
}

export const removeFromStorage = () => {
	Cookies.remove(ACCESS_TOKEN)
	Cookies.remove(REFRESH_TOKEN)
	localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokenStorage(data)
	localStorage.setItem('user', JSON.stringify(data))
}
