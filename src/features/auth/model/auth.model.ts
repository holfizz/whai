'use client'
import { IUser } from '@/entities/Auth'
import {
	getAccessToken,
	getUserFromStorage,
	removeFromStorage,
} from '@/shared/api/auth/auth.helper'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export type TypeAuthUser = IUser | null | undefined
type TypeAccessToken = string | null | undefined

interface IUseAuthState {
	user: TypeAuthUser
	accessToken: TypeAccessToken
}

interface IUseAuthActions {
	logout: () => void
	checkAuth: () => void
	setAccessToken: (accessToken: TypeAccessToken) => void
	setAuthUser: (user: TypeAuthUser) => void
}

export type useAuthProps = IUseAuthState & IUseAuthActions

export const useAuth = create<useAuthProps>()(
	persist(
		set => ({
			user: getUserFromStorage(),
			accessToken: getAccessToken(),
			logout: () => {
				set(() => ({ user: null }))
				removeFromStorage()
			},
			checkAuth: () => {
				// try {
				// 	const refreshToken = CookieService.getRefreshToken()
				// 	if (!refreshToken) {
				// 		return console.log('refresh token не существует')
				// 	}
				// 	const { data, error } = useQuery<
				// 		{ getNewTokens: IUserData },
				// 		getUserInput
				// 	>(GET_USER, {
				// 		variables: {
				// 			input: { refreshToken },
				// 		},
				// 	})
				// 	console.log(1112312321312312, data?.getNewTokens.user)
				// 	console.log(1112312321312312)
				// 	set(() => ({ user: data?.getNewTokens.user }))
				// 	if (error?.message) {
				// 		set(() => ({ user: null }))
				// 		removeFromStorage()
				// 	}
				// } catch (error) {
				// 	console.log(111, error)
				// }
			},
			setAccessToken: (accessToken: TypeAccessToken) => {
				set(() => ({ accessToken: accessToken }))
			},
			setAuthUser: (user: TypeAuthUser) => {
				set(() => ({ user: user }))
			},
		}),
		{ name: 'user' },
	),
)

interface IUseAuthStatus {
	isError: boolean
	setIsError: (errorStatus: boolean) => void
	isSuccess: boolean
	setIsSuccess: (successStatus: boolean) => void
}

export const useAuthStatus = create<IUseAuthStatus>()(set => ({
	isError: false,
	isSuccess: false,
	setIsError: errorStatus => set(() => ({ isError: errorStatus })),
	setIsSuccess: successStatus => set(() => ({ isSuccess: successStatus })),
}))
