import { IUserData } from '@/entities/Auth'
import { gql, useMutation } from '@apollo/client'

interface SignUpInput {
	input: {
		email: string
		firstName?: string
		lastName?: string
		phoneNumber?: string
		password: string
	}
}

const SIGN_UP = gql`
	mutation signUp($input: SignUpInput!) {
		signUp(signUpInput: $input) {
			accessToken
			user {
				email
				# roles
				firstName
				lastName
				phoneNumber
				avatarPath
			}
		}
	}
`

export const useSignUpMutation = () => {
	const [auth, { data, error }] = useMutation<
		{ signUp: IUserData },
		SignUpInput
	>(SIGN_UP)
	return { auth, data: data?.signUp, error }
}

//     LOGIN
interface LoginInput {
	input: {
		email: string
		password: string
	}
}

const LOGIN = gql`
	mutation login($input: loginInput!) {
		login(loginInput: $input) {
			accessToken
			user {
				email
				roles
				firstName
				lastName
				phoneNumber
				avatarPath
			}
		}
	}
`

export const useLoginMutation = () => {
	const [auth, { data, error }] = useMutation<{ login: IUserData }, LoginInput>(
		LOGIN,
	)
	return { auth, data: data?.login, error }
}
export interface getUserInput {
	input: {
		refreshToken: string
	}
}
export const REFRESH_TOKEN = gql`
	mutation getNewToken {
		getNewTokens {
			accessToken
		}
	}
`

export const useGetUserMutation = () => {
	const [checkAuth, { data, error }] = useMutation<
		{ getNewTokens: IUserData },
		getUserInput
	>(REFRESH_TOKEN)
	return { checkAuth, data: data?.getNewTokens, error }
}
