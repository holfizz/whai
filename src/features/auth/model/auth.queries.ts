import client from '@/app/(providers)/ApolloProvider/ui/apollo-client'
import { IAuthResponse } from '@/entities/Auth'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { authUserVar, logout } from './auth.model'

//==========input=======================================//
export interface SignUpInput {
	input: {
		email: string
		firstName?: string
		lastName?: string
		phoneNumber?: string
		password: string
	}
}

export interface LoginInput {
	input: {
		email: string
		password: string
	}
}

export interface GetNewTokenInput {
	input: {
		accessToken: string
	}
}

//==========response=======================================//
export interface GetNewTokenMutationResponse {
	getNewToken: {
		accessToken: string
	}
}
export interface SignUpMutationResponse {
	signUp: IAuthResponse
}

export interface LoginMutationResponse {
	login: IAuthResponse
}

// GraphQL мутации
const SIGN_UP = gql`
	mutation signUp($input: SignUpInput!) {
		signUp(signUpInput: $input) {
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
export const useSignUpMutation = () => {
	const [mutate, { data, loading, error }] = useMutation<
		SignUpMutationResponse,
		SignUpInput
	>(SIGN_UP)
	return { signUp: mutate, data, loading, error }
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
	const [mutate, { data, loading, error }] = useMutation<
		LoginMutationResponse,
		LoginInput
	>(LOGIN, {
		onCompleted: data => {
			authUserVar(data.login)
		}
	})
	return { login: mutate, data, loading, error }
}

export const GET_NEW_TOKEN = gql`
	mutation getNewToken {
		getNewToken {
			accessToken
		}
	}
`

export const useGetNewTokenMutation = () => {
	const [mutate, { data, loading, error }] = useMutation<
		GetNewTokenMutationResponse,
		GetNewTokenInput
	>(GET_NEW_TOKEN, {
		onCompleted: data => {
			const currentState = authUserVar()
			if (currentState && currentState.user) {
				const updatedAuthState = {
					...currentState,
					accessToken: data.getNewToken.accessToken
				}
				authUserVar(updatedAuthState)
			}
			client.reFetchObservableQueries()
		}
	})
	return { refreshAccessToken: mutate, data, loading, error }
}

const LOGOUT = gql`
	query logout {
		logout
	}
`

export const useLogoutQuery = () => {
	const [query, { loading, error }] = useLazyQuery<any>(LOGOUT, {
		onCompleted: () => {
			logout()
		}
	})
	return { logout: query, loading, error }
}
