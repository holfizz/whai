import { IUserData } from '@/entities/Auth'
import { gql, useMutation } from '@apollo/client'

// export const useAuthMutate = (type: authConstants) => {
// 	const { setIsError, setIsSuccess } = useAuthStatus()
// 	return useMutation<
// 		any,
// 		AxiosError<{
// 			message: string
// 		}>
// 	>({
// 		mutationKey: ['user'],
// 		mutationFn: (formData: any) => {
// 			const { email, password } = formData
// 			return AuthApi.main(type, { email, password })
// 		},
// 		onSuccess: () => {
// 			setIsSuccess(true)
// 			setIsError(false)
// 			if (type === authConstants.LOGIN) {
// 				// window.location.reload()
// 			}
// 		},
// 		onError: () => {
// 			setIsSuccess(false)
// 			setIsError(true)
// 		},
// 	})
// }

interface SignUpInput {
	input: {
		email: string
		firstName: string
		lastName: string
		phoneNumber: string
		password: string
	}
}

const SIGN_UP = gql`
	mutation signUp($input: SignUpInput!) {
		signUp(signUpInput: $input) {
			user {
				email
				firstName
				lastName
				phoneNumber
			}
			accessToken
		}
	}
`

const useSignUpMutation = () => {
	return useMutation<IUserData, SignUpInput>(SIGN_UP)
}
export default useSignUpMutation
