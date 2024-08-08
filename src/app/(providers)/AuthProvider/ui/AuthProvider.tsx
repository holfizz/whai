'use client'

import { useGetNewTokenQuery } from '@/features/auth/model/auth.queries'
import { getAccessToken, saveTokenStorage } from '@/shared/api/auth/auth.helper'
import Loader from '@/shared/ui/Loader/Loader'
import { ReactNode, useEffect, useState } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [loading, setLoading] = useState(true)
	const { dataNewToken, loading: queryLoading, error } = useGetNewTokenQuery()

	useEffect(() => {
		const fetchNewToken = async () => {
			try {
				if (dataNewToken) {
					const newAccessToken = dataNewToken.accessToken

					if (newAccessToken) {
						saveTokenStorage(newAccessToken)
					} else {
						throw new Error('Failed to get new access token')
					}
				}
			} catch (error) {
				console.error('Failed to refresh token:', error)
			} finally {
				setLoading(false)
			}
		}

		const token = getAccessToken()
		if (!token) {
			fetchNewToken()
		} else {
			setLoading(false)
		}
	}, [dataNewToken])

	if (loading || queryLoading) {
		return (
			<div className='flex absolute justify-center items-center h-full w-full bg-[var(--color-decor-4)]'>
				<Loader />
			</div>
		)
	}

	if (error) {
		console.error('Error fetching new token:', error)
	}

	return <>{children}</>
}

export default AuthProvider
