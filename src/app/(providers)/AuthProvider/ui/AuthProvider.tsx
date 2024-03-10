'use client'
import { useAuth } from '@/features/auth'
import { usePathname } from '@/navigation'
import { getAccessToken, getRefreshToken } from '@/shared/api/auth/auth.helper'
import { FC, PropsWithChildren, useEffect } from 'react'

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useAuth()

	const pathname = usePathname()

	useEffect(() => {
		const accessToken = getAccessToken()
		if (accessToken) checkAuth()
	}, [checkAuth])
	useEffect(() => {
		const refreshToken = getRefreshToken()
		if (!refreshToken && user) {
			logout()
		}
	}, [logout, pathname, user])
	// pathname !== '/auth' && router.replace('/auth')
	// if (pathname !== '/auth') return <LoginPageAsync />
	if (user) return <>{children}</>
	return <>{children}</>
}
