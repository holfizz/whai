'use client'
import { gql, useQuery } from '@apollo/client'
import { IUser } from '..'

export const LOGOUT = gql`
	query Logout {
		logout
	}
`

export const GET_PROFILE = gql`
	query {
		getProfile {
			email
			firstName
			lastName
			avatarPath
			phoneNumber
		}
	}
`
export const useGetProfile = () => {
	const { data, error } = useQuery<{ getProfile: IUser }>(GET_PROFILE, {
		fetchPolicy: 'cache-first',
	})
	return { user: data?.getProfile, error }
}
