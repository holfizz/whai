import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/features/auth/model/auth.model'

export const useAuthRedirect = () => {
	const { user } = useAuth()

	const { replace } = useRouter()
	useEffect(() => {
		if (user) {
			replace('/')
		}
	}, [replace, user])
}
