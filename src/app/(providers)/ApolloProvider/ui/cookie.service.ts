import { EnumTokens } from '@/shared/types/auth'
import Cookies from 'js-cookie'

export class CookieService {
	static getAccessToken() {
		return Cookies.get(EnumTokens.ACCESS_TOKEN)
	}
	static getRefreshToken() {
		return Cookies.get(EnumTokens.REFRESH_TOKEN)
	}

	static setAccessToken(token: string | null) {
		return Cookies.set(EnumTokens.ACCESS_TOKEN, token || '')
	}

	static removeAccessToken() {
		return Cookies.remove(EnumTokens.ACCESS_TOKEN)
	}
}
