'use client'
import client from '@/app/(providers)/ApolloProvider/ui/apollo-client'
import { IUser } from '@/entities/Auth'
import { LOGOUT } from '@/entities/Auth/model/auth.queries'
import {
	getUserFromStorage,
	removeFromStorage,
} from '@/shared/api/auth/auth.helper'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export type TypeAuthUser = IUser | null | undefined
type TypeAccessToken = string | null | undefined

interface IUseAuthState {
	user: TypeAuthUser
}

interface IUseAuthActions {
	setAuthUser: (user: TypeAuthUser) => void
	logout: () => void
}

export type useAuthProps = IUseAuthState & IUseAuthActions

export const useAuth = create<useAuthProps>()(
	persist(
		set => ({
			user: getUserFromStorage(),
			setAuthUser: (user: TypeAuthUser) => {
				set(() => ({ user: user }))
			},
			logout: () => {
				client.query({
					query: LOGOUT,
				})
				set(() => ({ user: null, accessToken: null }))
				removeFromStorage()
				
			},
		}),
		{ name: 'user' },
	),
)
