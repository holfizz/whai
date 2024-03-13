'use client'
import { PING, logout } from '@/entities/Auth/model/auth.queries'
import { useAuth } from '@/features/auth/model/auth.model'
import { getAccessToken } from '@/shared/api/auth/auth.helper'
import { useLazyQuery } from '@apollo/client'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { user, setAuthUser } = useAuth()

	const pathname = usePathname()
	const accessToken = getAccessToken()
	const [ping, { error: pingError }] = useLazyQuery(PING, {
		fetchPolicy: 'network-only',
	})

	useEffect(() => {
		if (accessToken) {
			ping()
		}
		if (pingError) {
			logout()
			setAuthUser(null)
		}
	}, [accessToken, ping, pingError, setAuthUser])

	useEffect(() => {
		const refreshToken = getAccessToken()
		if (!refreshToken && user) {
			logout()
		}
	}, [pathname, user])

	// pathname !== '/auth' && router.replace('/auth')
	// if (pathname !== '/auth') return <Auth />
	// if (user) return <>{children}</>
	return <>{children}</>
}

export default AuthProvider
