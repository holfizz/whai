'use client'
import { client } from '@/app/(providers)/ApolloProvider/ui/apollo-client'
import { IAuthResponse, IUser } from '@/entities/Auth'
import { LOGOUT } from '@/entities/Auth/model/auth.queries'
import { makeVar } from '@apollo/client'
export type TypeAuthUser = IUser | null | undefined

export const authUserVar = makeVar<IAuthResponse | null>(null)

export function setAuthUser(authResponse: IAuthResponse | null) {
	authUserVar(authResponse)
	if (authResponse) saveAuthStateToStorage(authResponse)
	else logout()
}

export async function logout() {
	try {
		await client.mutate({ mutation: LOGOUT })
		authUserVar(null)
	} catch (error) {
		console.error('Logout error:', error)
	}
}

export function getCurrentUser(): IUser | null | undefined {
	const authState = authUserVar()
	return authState ? authState.user : null
}

export function saveAuthStateToStorage(authResponse: IAuthResponse) {
	localStorage.setItem('authState', JSON.stringify(authResponse))
}

export function loadAuthStateFromStorage(): IAuthResponse | null {
	const storedState = localStorage.getItem('authState')
	return storedState ? JSON.parse(storedState) : null
}
