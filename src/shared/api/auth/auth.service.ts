import Cookies from 'js-cookie'

import { authConstants } from '@/shared/const/auth'
import { REFRESH_TOKEN } from '@/shared/const/token'
import { getContentType } from '@/shared/api/api.helper'
import { axiosClassic } from '@/shared/api/api.interceptor'
import { saveToStorage } from '@/shared/api/auth/auth.helper'
import {
	IAuthResponse,
	IEmailPassword,
} from '@/entities/Profile/model/profile.types'

export const AuthService = {
	async main(
		type: authConstants.LOGIN | authConstants.REGISTER,
		data: IEmailPassword,
	) {
		const response = await axiosClassic<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'post',
			data,
		})
		console.log(response)
		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
		// return ProfileData.parse(response.data)
	},
	async getNewTokens() {
		const refreshToken = Cookies.get(REFRESH_TOKEN)

		const response = await axiosClassic.post<string, { data: IAuthResponse }>(
			'/auth/login/access-token',
			{ refreshToken },
			{ headers: getContentType() },
		)
		return response.data
	},
	async activateEmail(activationLink: string) {
		const response = await axiosClassic.get<string, { data: boolean }>(
			`/auth/activate/${activationLink}`,
			{ headers: getContentType() },
		)
		return response.data
	},
}
