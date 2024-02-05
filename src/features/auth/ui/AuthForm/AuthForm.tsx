import { Dispatch, FC, FormEvent, memo, SetStateAction, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AuthForm.module.scss'
import Button, { ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import Input, { InputSize, InputTheme } from '@/shared/ui/Input/Input'
import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { authConstants } from '@/shared/const/auth'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import AppLink from '@/shared/ui/AppLink/AppLink'
import { useAuthMutate } from '@/features/auth/model/auth.queries'
import { useAuthStatus } from '@/features/auth/model/auth.model'

export interface AuthFormProps {
	className?: string
	type: authConstants
	onClose: Dispatch<SetStateAction<boolean>>
}

const AuthForm: FC<AuthFormProps> = memo(({ className, type, onClose }) => {
	const { t } = useTranslation()
	const { mutate: authMutate, data, error } = useAuthMutate(type)
	const { isError, isSuccess } = useAuthStatus()

	const [formErrors, setFormErrors] = useState<
		z.ZodFormattedError<
			{
				email: string
				password: string
			},
			string
		>
	>({ _errors: [] })
	const formSchema = z.object({
		email: z.string().email('Email is not correct'),
		password: z
			.string()
			.min(6, { message: 'The password must be at least 6 characters' }),
	})
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = new FormData(e.currentTarget)
		const formData = Object.fromEntries(form.entries())
		const validationResult = formSchema.safeParse(formData)

		if (!validationResult.success) {
			const errors = validationResult.error.format()
			setFormErrors(errors)
		} else {
			setFormErrors({ _errors: [] })
			authMutate(validationResult.data as any)
		}
	}

	const onCloseModal = () => {
		setTimeout(() => {
			onClose(false)
		}, 800)
	}
	return (
		<form
			onSubmit={onSubmit}
			className={classNames(cls.LoginForm, {}, [className])}
		>
			<Text
				theme={
					isError
						? TextTheme.ERROR
						: !!data
							? TextTheme.SUCCESS
							: TextTheme.PRIMARY
				}
				size={TextSize.L}
				title={type === authConstants.LOGIN ? t('log in') : t('register')}
			/>
			{error && (
				<Text
					theme={TextTheme.ERROR}
					text={error?.response?.data?.message}
					size={TextSize.L}
				/>
			)}
			{type === authConstants.REGISTER && isSuccess && (
				<Text
					theme={TextTheme.SUCCESS}
					text={t('Confirm your email')}
					size={TextSize.L}
				/>
			)}
			<label>
				<Text
					size={TextSize.S}
					theme={TextTheme.ERROR}
					text={formErrors.email?._errors.join(', ')}
				/>
				<Input
					size={InputSize.FULL}
					name={'email'}
					theme={InputTheme.OUTLINE}
					className={cls.input}
					placeholder={t('Enter email...')}
					type='text'
				/>
			</label>
			<label>
				<Text
					size={TextSize.S}
					theme={TextTheme.ERROR}
					text={formErrors.password?._errors.join(', ')}
				/>
				<Input
					name={'password'}
					size={InputSize.FULL}
					theme={InputTheme.OUTLINE}
					className={cls.input}
					placeholder={t('Enter password...')}
					type='password'
				/>
			</label>
			<Button
				onClick={data && onCloseModal}
				type={'submit'}
				size={ButtonSize.FULL}
				theme={ButtonTheme.OUTLINE}
			>
				{type === authConstants.LOGIN ? t('log in') : t('register')}
			</Button>
			<AppLink onClick={onCloseModal} href={'/forgotPassword'}>
				{t('Forgot your password?')}
			</AppLink>
		</form>
	)
})

export default AuthForm
