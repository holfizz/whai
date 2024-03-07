import { AuthApi } from '@/features/auth'
import { authConstants } from '@/shared/const/auth'
import { gql } from '@apollo/client'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAuthStatus } from './auth.model'

export const useAuthMutate = (type: authConstants) => {
	const { setIsError, setIsSuccess } = useAuthStatus()
	return useMutation<
		any,
		AxiosError<{
			message: string
		}>
	>({
		mutationKey: ['user'],
		mutationFn: (formData: any) => {
			const { email, password } = formData
			return AuthApi.main(type, { email, password })
		},
		onSuccess: () => {
			setIsSuccess(true)
			setIsError(false)
			if (type === authConstants.LOGIN) {
				window.location.reload()
			}
		},
		onError: () => {
			setIsSuccess(false)
			setIsError(true)
		},
	})
}

export const GET_AUTH = gql`
	mutation GetNewTokens($dto: RefreshTokenInput!) {
		getNewTokens(dto: $dto) {
			accessToken
			user {
				email
				isActivated
			}
		}
	}
`
