import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AuthApi } from '@/features/auth'
import { useAuthStatus } from './auth.model'
import { authConstants } from '@/shared/const/auth'

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
