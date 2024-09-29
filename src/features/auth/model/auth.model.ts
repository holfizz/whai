'use client'

import client from '@/app/(providers)/ApolloProvider/ui/apollo-client'
import { IUserData } from '@/entities/Auth'
import { removeFromStorage } from '@/shared/api/auth/auth.helper'
import { makeVar } from '@apollo/client'
import { LOGOUT } from './auth.queries'

export const authUserVar = makeVar<IUserData>({
	accessToken: null,
	user: null
})

export function setAuthUser(authResponse: IUserData | null): void {
	authUserVar(authResponse)
	if (authResponse) {
		saveAuthStateToStorage(authResponse)
	} else {
		logout()
	}
}

export async function logout(isReload = false): Promise<void> {
	console.log('0logout')

	try {
		console.log('01logout')
		const { data } = await client.query({ query: LOGOUT })
		localStorage.removeItem('authState')
		console.log('1logout', data)
		removeFromStorage()
		console.log('2logout')

		authUserVar({
			user: null,
			accessToken: null
		})
		console.log('3logout')

		if (isReload && data?.logout) {
			window.location.reload()
		}
	} catch (error) {
		console.log('error_logout')

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
