'use client'

import { saveTokenStorage } from '@/shared/api/auth/auth.helper'
import { authConstants } from '@/shared/const/auth'
import {
	getRouteForgotPassword,
	getRouteLogin,
	getRouteSignUp,
} from '@/shared/const/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import AppLink from '@/shared/ui/AppLink/AppLink'
import Button from '@/shared/ui/Button/Button'
import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { Input } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import {
	Dispatch,
	FC,
	FormEvent,
	SetStateAction,
	memo,
	useEffect,
	useState,
} from 'react'
import { HiOutlineEye } from 'react-icons/hi'
import { PiEyeClosedBold } from 'react-icons/pi'
import { z } from 'zod'
import { formLoginSchema, formSignUpSchema } from '../../model/auth.contracts'
import { useAuth } from '../../model/auth.model'
import { useLoginMutation, useSignUpMutation } from '../../model/auth.queries'
import InputField from '../AuthLabel/InputField'
import cls from './AuthForm.module.scss'

export interface AuthFormProps {
	className?: string
	type: authConstants
	setIsFormType?: Dispatch<SetStateAction<authConstants>>
}

const AuthForm: FC<AuthFormProps> = memo(
	({ className, type, setIsFormType }) => {
		const t = useTranslations('auth')
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
		const [isVisible, setIsVisible] = useState(false)
		const { setAuthUser, setAccessToken, accessToken } = useAuth()
		const { auth, data, error } =
			type === authConstants.SIGNUP ? useSignUpMutation() : useLoginMutation()

		const toggleVisibility = () => setIsVisible(!isVisible)
		useEffect(() => {
			if (data) {
				setAuthUser(data.user)
				setAccessToken(data.accessToken)
				saveTokenStorage(data)
			}
		}, [data, setAuthUser, setAccessToken])

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
				<Text
					theme={
						error?.message
							? TextTheme.ERROR
							: data
							? TextTheme.SUCCESS
							: TextTheme.PRIMARY
					}
					size={TextSize.L}
					title={type === authConstants.LOGIN ? t('Log in') : t('Sign up')}
				/>
				{error && (
					<Text
						theme={TextTheme.ERROR}
						text={error?.message}
						size={TextSize.L}
					/>
				)}
				{type === authConstants.SIGNUP && data && (
					<Text
						theme={TextTheme.SUCCESS}
						text={t('Confirm your email')}
						size={TextSize.L}
					/>
				)}

				{type === authConstants.SIGNUP && (
					<>
						<InputField
							className={cls.label}
							name={'phoneNumber'}
							label={t('Phone Number')}
							type='number'
							color={
								formErrors.phoneNumber?._errors.length ? 'danger' : 'default'
							}
							errorMessage={formErrors.phoneNumber?._errors.join(', ')}
							placeholder={t('Enter your phone number')}
						/>
						<InputField
							className={cls.label}
							name={'firstName'}
							label={t('First Name')}
							type='text'
							color={
								formErrors.firstName?._errors.length ? 'danger' : 'default'
							}
							errorMessage={formErrors.firstName?._errors.join(', ')}
							placeholder={t('Enter your first name')}
						/>
						<InputField
							className={cls.label}
							name={'lastName'}
							label={t('Last Name')}
							type='text'
							color={formErrors.lastName?._errors.length ? 'danger' : 'default'}
							errorMessage={formErrors.lastName?._errors.join(', ')}
							placeholder={t('Enter your last name')}
						/>
					</>
				)}
				<InputField
					className={cls.label}
					name={'email'}
					type='email'
					label={t('Email')}
					color={formErrors.email?._errors.length ? 'danger' : 'default'}
					errorMessage={formErrors.email?._errors.join(', ')}
					placeholder={t('Enter your email')}
				/>
				<label className={cls.label}>
					<div className={cls.passwordInput}>
						<Input
							label={t('Password')}
							variant='bordered'
							placeholder={t('Enter your password')}
							isRequired
							endContent={
								<button
									className='focus:outline-none'
									type='button'
									onClick={toggleVisibility}
								>
									{isVisible ? (
										<HiOutlineEye className='text-2xl text-default-400 pointer-events-none' />
									) : (
										<PiEyeClosedBold className='text-2xl text-default-400 pointer-events-none' />
									)}
								</button>
							}
							color={formErrors.password?._errors.length ? 'danger' : 'default'}
							errorMessage={formErrors.password?._errors.join(', ')}
							type={isVisible ? 'text' : 'password'}
							name='password'
						/>
					</div>
				</label>
				<Button color='mainFill' type={'submit'} className={cls.submitButton}>
					{type === authConstants.LOGIN ? t('Log in') : t('Sign up')}
				</Button>
				<AppLink
					className={cls.forgotPasswordButton}
					href={getRouteForgotPassword()}
				>
					<Button color='danger' variant='light'>
						{t('Forgot your password?')}
					</Button>
				</AppLink>
				<AppLink
					onClick={() =>
						setIsFormType &&
						setIsFormType(
							type === authConstants.LOGIN
								? authConstants.SIGNUP
								: authConstants.LOGIN,
						)
					}
					className={cls.changeModeButton}
					href={
						type === authConstants.LOGIN ? getRouteSignUp() : getRouteLogin()
					}
				>
					<Button variant='light' color='warning'>
						{type === authConstants.LOGIN ? t('Sign up') : t('Log in')}
					</Button>
				</AppLink>
			</form>
		)
	},
)

export default AuthForm
