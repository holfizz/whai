'use client'
import { useAuth } from '@/features/auth/model/auth.model'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
	const { user } = useAuth()
	const { replace } = useRouter()
	useEffect(() => {
		if (user) {
			replace('/')
		}
	}, [replace, user])
}
