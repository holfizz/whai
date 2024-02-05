'use client'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useAuth } from '@/features/auth/model/auth.model'
import { usePathname } from 'next/navigation'
import { getAccessToken, getRefreshToken } from '@/shared/api/auth/auth.helper'

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
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
	// if (pathname !== '/auth') return <Auth />
	// if (user) return <>{children}</>
	return <>{children}</>
}

export default AuthProvider
