'use client'

import { saveTokenStorage } from '@/shared/api/auth/auth.helper'
import { authConstants } from '@/shared/const/auth'

import { classNames } from '@/shared/lib/classNames/classNames'

import {
	Dispatch,
	FC,
	FormEvent,
	SetStateAction,
	memo,
	useEffect,
	useState,
} from 'react'

import { z } from 'zod'
import { formLoginSchema, formSignUpSchema } from '../../model/auth.contracts'
import { useAuth } from '../../model/auth.model'
import { useLoginMutation, useSignUpMutation } from '../../model/auth.queries'

import BasicInputs from '../BasicInputs/BasicInputs'
import ButtonsForm from '../ButtonsForm/ButtonsForm'
import InfoMessage from '../InfoMessage/InfoMessage'
import RegistraionInputs from '../RegistrInputs/RegistrInputs'
import cls from './AuthForm.module.scss'

export interface AuthFormProps {
	className?: string
	type: authConstants
	setIsFormType?: Dispatch<SetStateAction<authConstants>>
}

const AuthForm: FC<AuthFormProps> = memo(
	({ className, type, setIsFormType }) => {
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

		const { setAuthUser } = useAuth()
		const { auth, data, error } =
			type === authConstants.SIGNUP ? useSignUpMutation() : useLoginMutation()

		useEffect(() => {
			if (data) {
				setAuthUser(data.user)
				saveTokenStorage(data.accessToken)
			}
		}, [data, setAuthUser])

		const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			const form = new FormData(e.currentTarget)
			const formData = Object.fromEntries(form.entries())
			const formSchema =
				type === authConstants.SIGNUP ? formSignUpSchema : formLoginSchema
			const validationResult = formSchema.safeParse(formData)

			if (!validationResult.success) {
				const errors = validationResult.error.format()
				setFormErrors(errors)
			} else {
				setFormErrors({ _errors: [] })
				auth({
					variables: {
						input: validationResult.data,
					},
				})
			}
		}

		return (
			<form
				onSubmit={onSubmit}
				className={classNames(cls.LoginForm, {}, [className])}
			>
				{/* Информация над формой  регистрации / логина */}
				<InfoMessage error={error} data={data} type={type} />

				{/* Инпуты которые используется при регистрации */}
				<RegistraionInputs type={type} formErrors={formErrors} />

				{/* Инпуты логина(email) и пароля(password) */}
				<BasicInputs formErrors={formErrors} />

				{/* Кнопки для формы */}
				<ButtonsForm type={type} setIsFormType={setIsFormType} />
			</form>
		)
	},
)

export default AuthForm
