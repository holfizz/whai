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
