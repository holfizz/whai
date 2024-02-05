import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AuthService } from '@/shared/api/auth/auth.service'
import { useAuthStatus } from '@/features/auth/model/auth.model'
import { authConstants } from '@/shared/const/auth'
import { IEmailPassword } from '@/entities/Profile/model/profile.types'

const useCustomHook = () => {
	const { setIsError, setIsSuccess } = useAuthStatus()

	return { setIsError, setIsSuccess }
}

export const handleAuthSuccess = (type: authConstants) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { setIsSuccess, setIsError } = useCustomHook()
	setIsSuccess(true)
	setIsError(false)
	if (type === authConstants.LOGIN) {
		window.location.reload()
	}
}

export const handleAuthError = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { setIsSuccess, setIsError } = useCustomHook()
	setIsSuccess(true)
	setIsError(true)
}
export const useAuthMutate = (type: authConstants) => {
	return useMutation<
		any,
		AxiosError<{
			message: string
		}>
	>({
		mutationKey: ['user'],
		mutationFn: (formData: any) => {
			const { email, password } = formData
			return AuthService.main(type, { email, password })
		},
		onSuccess: (data: IEmailPassword) => handleAuthSuccess(type, data),
		onError: handleAuthError,
	})
}
