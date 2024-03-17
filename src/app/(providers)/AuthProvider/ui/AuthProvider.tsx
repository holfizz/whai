'use client'
import { useAuth } from '@/features/auth/model/auth.model'
import { getAccessToken } from '@/shared/api/auth/auth.helper'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { user, setAuthUser, logout } = useAuth()

	const pathname = usePathname()
	const accessToken = getAccessToken()
	useEffect(() => {
		if (!accessToken) {
			logout()
		}
	}, [accessToken, logout, setAuthUser])
	useEffect(() => {
		const refreshToken = getAccessToken()
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
