import { IAuthResponse } from '@/entities/Auth'

import { gql, useMutation } from '@apollo/client'
import { authUserVar } from './auth.model'

// SIGN UP
interface SignUpInput {
	input: {
		email: string
		firstName?: string
		lastName?: string
		phoneNumber?: string
		password: string
	}
}

export const SIGN_UP = gql`
	mutation signUp($input: SignUpInput!) {
		signUp(signUpInput: $input) {
			accessToken
			refreshToken
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
export const useSignUpMutation = () => {
	const [signUpMutation, { data, error }] = useMutation<
		{ signUp: IAuthResponse },
		SignUpInput
	>(SIGN_UP, {
		onCompleted: data => {
			authUserVar(data.signUp)
		},
	})
	return { signUpMutation, data: data?.signUp, error }
}

// LOGIN
interface LoginInput {
	input: {
		email: string
		password: string
	}
}

export const LOGIN = gql`
	mutation login($input: loginInput!) {
		login(loginInput: $input) {
			accessToken
			refreshToken
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
	const [loginMutation, { data, error }] = useMutation<
		{ login: IAuthResponse },
		LoginInput
	>(LOGIN, {
		onCompleted: data => {
			authUserVar(data.login)
		},
	})
	return { loginMutation, data: data?.login, error }
}
// REFRESH TOKEN
export interface getUserInput {
	input: {
		refreshToken: string
	}
}

export const REFRESH_TOKEN = gql`
	mutation getNewToken($input: RefreshTokenInput!) {
		getNewToken(refreshTokenInput: $input) {
			accessToken
			refreshToken
		}
	}
`

export const useGetUserMutation = () => {
	const [refreshTokenMutation, { data, error }] = useMutation<
		{ getNewToken: IAuthResponse },
		getUserInput
	>(REFRESH_TOKEN, {
		onCompleted: data => {
			authUserVar(data.getNewToken)
		},
	})
	return { refreshTokenMutation, data: data?.getNewToken, error }
}

export const LOGOUT = gql`
	mutation logout {
		logout
	}
`
