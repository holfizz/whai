'use client'
import { IUser } from '@/entities/Auth'
import { AuthApi } from '@/features/auth'
import { errorCatch } from '@/shared/api/api.helper'
import {
	getAccessToken,
	getUserFromStorage,
	removeFromStorage,
} from '@/shared/api/auth/auth.helper'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TypeAuthUser = IUser | null

interface IUseAuthState {
	user: TypeAuthUser
	accessToken: string | null
}

interface IUseAuthActions {
	logout: () => void
	checkAuth: () => void
	setAccessToken: (accessToken: string | null) => void
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
			checkAuth: async () => {
				try {
					const response = await AuthApi.getNewTokens()
					set(() => ({ user: response.user }))
					return response
				} catch (error) {
					if (errorCatch(error) === 'Internal server error') {
						set(() => ({ user: null }))
						removeFromStorage()
					}
				}
			},
			setAccessToken: (accessToken: string | null) => {
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
