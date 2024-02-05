'use client'
import { create } from 'zustand'
import { IAuthResponse } from '@/entities/Profile/model/profile.types'
import { persist } from 'zustand/middleware'
import {
	getUserFromStorage,
	removeFromStorage,
} from '@/shared/api/auth/auth.helper'
import { AuthService } from '@/shared/api/auth/auth.service'
import { errorCatch } from '@/shared/api/api.helper'

interface IUseAuthState {
	user: IAuthResponse | unknown | null | undefined
}

interface IUseAuthActions {
	logout: () => void
	checkAuth: () => void
}

type useAuthProps = IUseAuthState & IUseAuthActions

export const useAuth = create<useAuthProps>()(
	persist(
		set => ({
			user: getUserFromStorage(),
			logout: () => {
				set(() => ({ user: null }))
				removeFromStorage()
			},
			checkAuth: async () => {
				try {
					const response = await AuthService.getNewTokens()
					set(() => ({ user: response.user }))
					return response
				} catch (error) {
					if (errorCatch(error) === 'Internal server error') {
						set(() => ({ user: null }))
						removeFromStorage()
					}
				}
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
