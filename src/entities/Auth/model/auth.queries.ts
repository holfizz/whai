'use client'
import { gql, useMutation, useQuery } from '@apollo/client'
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
		fetchPolicy: 'network-only',
	})
	return { userData: data?.getProfile, errorProfile: error }
}

export const UPDATE_PROFILE = gql`
	mutation ($input: UpdateUserInput!, $picture: Upload) {
		updateProfile(dto: $input, picture: $picture) {
			email
			firstName
			lastName
			avatarPath
			phoneNumber
		}
	}
`
export const useUpdateProfile = () => {
	const [updateProfile, { data, error }] = useMutation<{
		updateProfile: IUser
	}>(UPDATE_PROFILE)
	return { updateProfile, updateData: data?.updateProfile, errorUpdate: error }
}
