'use client'
import { IUser } from '@/entities/Auth'
import { GET_PROFILE } from '@/entities/Auth/model/auth.queries'
import { useRouter } from '@/navigation'
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
	const { data: user } = useQuery<{ getProfile: IUser }>(GET_PROFILE)

	const { replace } = useRouter()

	useEffect(() => {
		if (!!user?.getProfile?.email) replace('/d')
	}, [replace, user])
}
