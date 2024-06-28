'use client'

import { client } from '@/app/(providers)/ApolloProvider/ui/apollo-client'
import { IUserData } from '@/entities/Auth'
import { LOGOUT } from '@/entities/Auth/model/auth.queries'
import { removeFromStorage } from '@/shared/api/auth/auth.helper'
import { makeVar } from '@apollo/client'

export const authUserVar = makeVar<IUserData>({
	accessToken: null,
	user: null,
})

export function setAuthUser(authResponse: IUserData | null): void {
	authUserVar(authResponse)
	if (authResponse) {
		saveAuthStateToStorage(authResponse)
	} else {
		logout()
	}
}

export async function logout(): Promise<void> {
	try {
		await client.mutate({ mutation: LOGOUT })
		localStorage.removeItem('authState')
		removeFromStorage()
		authUserVar({
			user: null,
			accessToken: null,
		})
	} catch (error) {
		console.error('Logout error:', error)
	}
}

export function saveAuthStateToStorage(authResponse: IUserData): void {
	if (typeof window !== 'undefined' && window.localStorage) {
		try {
			localStorage.setItem('authState', JSON.stringify(authResponse))
		} catch (error) {
			console.error('Error saving auth state to storage:', error)
		}
	}
}

export function loadAuthStateFromStorage(): IUserData | null {
	if (typeof window !== 'undefined' && window.localStorage) {
		try {
			const storedState = localStorage.getItem('authState')
			return storedState ? JSON.parse(storedState) : null
		} catch (error) {
			console.error('Error loading auth state from storage:', error)
			return null
		}
	}
	return null
}
