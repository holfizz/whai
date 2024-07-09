'use client'

import {useRouter} from '@/navigation'
import {saveTokenStorage} from '@/shared/api/auth/auth.helper'
import {authConstants} from '@/shared/const/auth'
import {classNames} from '@/shared/lib/classNames/classNames'
import {Dispatch, FC, FormEvent, memo, SetStateAction, useEffect, useState,} from 'react'
import {z} from 'zod'
import {formLoginSchema, formSignUpSchema} from '../../model/auth.contracts'
import {setAuthUser} from '../../model/auth.model'
import {LoginInput, SignUpInput, useLoginMutation, useSignUpMutation,} from '../../model/auth.queries'
import BasicInputs from '../BasicInputs/BasicInputs'
import ButtonsForm from '../ButtonsForm/ButtonsForm'
import InfoMessage from '../InfoMessage/InfoMessage'
import RegistrationInputs from '../RegistrInputs/RegistrInputs'
import cls from './AuthForm.module.scss'

export interface AuthFormProps {
	className?: string
	type: authConstants
	setIsFormType?: Dispatch<SetStateAction<authConstants>>
}

const AuthForm: FC<AuthFormProps> = memo(
	({ className, type, setIsFormType }) => {
		const router = useRouter()
		const [formErrors, setFormErrors] = useState<
			z.ZodFormattedError<
				{
					email: string
					password: string
					phoneNumber?: string
					firstName?: string
					lastName?: string
				},
				string
			>
		>({ _errors: [] })

		const {
			login,
			data: loginData,
			loading: loginLoading,
			error: loginError,
		} = useLoginMutation()
		const {
			signUp,
			data: signUpData,
			loading: signUpLoading,
			error: signUpError,
		} = useSignUpMutation()

		const data = type === authConstants.SIGNUP ? signUpData : loginData
		const loading = type === authConstants.SIGNUP ? signUpLoading : loginLoading
		const error = type === authConstants.SIGNUP ? signUpError : loginError

		useEffect(() => {
			if (loginData) {
				const userData = loginData.login
				setAuthUser(userData)
				saveTokenStorage(userData.accessToken)
			}
		}, [loginData])

		useEffect(() => {
			if (loginData && type === authConstants.LOGIN) {
				setTimeout(() => {
					router.push('/')
				}, 2000)
			}
		}, [loginData, router, type])

		const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			const form = new FormData(e.currentTarget)
			const formData = Object.fromEntries(form.entries())
			const formSchema =
				type === authConstants.SIGNUP ? formSignUpSchema : formLoginSchema
			const validationResult = formSchema.safeParse(formData) as any

			if (!validationResult.success) {
				const errors = validationResult.error.format()
				setFormErrors(errors)
			} else {
				setFormErrors({ _errors: [] })
				const variables = { input: validationResult.data }

				if (type === authConstants.SIGNUP) {
					signUp({ variables: variables as SignUpInput })
				} else {
					login({ variables: variables as LoginInput })
				}
			}
		}

		return (
			<form
				onSubmit={onSubmit}
				className={classNames(cls.LoginForm, {}, [className])}
			>
				<InfoMessage error={error} data={data} type={type} />
				<RegistrationInputs type={type} formErrors={formErrors} />
				<BasicInputs formErrors={formErrors} />
				<ButtonsForm type={type} setIsFormType={setIsFormType} />
			</form>
		)
	},
)

export default AuthForm
