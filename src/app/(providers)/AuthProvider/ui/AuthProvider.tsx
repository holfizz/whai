'use client'
import { useAuth } from '@/features/auth/model/auth.model'
import { getAccessToken } from '@/shared/api/auth/auth.helper'
import { ReactNode, useEffect } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { setAuthUser, logout } = useAuth()
	const accessToken = getAccessToken()
	useEffect(() => {
		if (!accessToken) {
			logout()
			console.log(1)
		}
	}, [accessToken, logout, setAuthUser])

	// pathname !== '/auth' && router.replace('/auth')
	// if (pathname !== '/auth') return <Auth />
	// if (user) return <>{children}</>
	return <>{children}</>
}

export default AuthProvider
