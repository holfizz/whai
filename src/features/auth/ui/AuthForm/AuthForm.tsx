import { authConstants } from '@/shared/const/auth'
import { classNames } from '@/shared/lib/classNames/classNames'
import AppLink from '@/shared/ui/AppLink/AppLink'
import Button, { ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import Input, { InputSize, InputTheme } from '@/shared/ui/Input/Input'
import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { Dispatch, FC, FormEvent, SetStateAction, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineEye } from 'react-icons/hi'
import { PiEyeClosedBold } from 'react-icons/pi'
import { z } from 'zod'
import { formSchema } from '../../model/auth.contracts'
import { useAuthStatus } from '../../model/auth.model'
import { useAuthMutate } from '../../model/auth.queries'
import cls from './AuthForm.module.scss'

export interface AuthFormProps {
	className?: string
	type: authConstants
	onClose: Dispatch<SetStateAction<boolean>>
	setIsFormType?: Dispatch<SetStateAction<authConstants>>
}

const AuthForm: FC<AuthFormProps> = memo(
	({ className, type, onClose, setIsFormType }) => {
		const { t } = useTranslation()
		const { mutate: authMutate, error } = useAuthMutate(type)
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
		const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
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

		return (
			<form
				onSubmit={onSubmit}
				className={classNames(cls.LoginForm, {}, [className])}
			>
				<Text
					theme={
						isError
							? TextTheme.ERROR
							: isSuccess
							? TextTheme.SUCCESS
							: TextTheme.PRIMARY
					}
					size={TextSize.L}
					title={type === authConstants.LOGIN ? t('log in') : t('sign-up')}
				/>
				{error && (
					<Text
						theme={TextTheme.ERROR}
						text={error?.response?.data?.message}
						size={TextSize.L}
					/>
				)}
				{type === authConstants.SIGNUP && isSuccess && (
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
				<label className={cls.passwordLabel}>
					<Text
						size={TextSize.S}
						theme={TextTheme.ERROR}
						text={formErrors.password?._errors.join(', ')}
					/>
					<div className={cls.passwordInput}>
						<Input
							name={'password'}
							size={InputSize.FULL}
							theme={InputTheme.OUTLINE}
							className={cls.input}
							placeholder={t('Enter password...')}
							type={isShowPassword ? 'text' : 'password'}
						/>
						<button
							className={cls.changeVisiblePasswordButton}
							onClick={e => {
								e.preventDefault()
								setIsShowPassword(prevState => !prevState)
							}}
						>
							<Icon
								fontSize={20}
								SVG={isShowPassword ? HiOutlineEye : PiEyeClosedBold}
							/>
						</button>
					</div>
				</label>
				<Button
					type={'submit'}
					size={ButtonSize.FULL}
					theme={ButtonTheme.OUTLINE}
					className={cls.submitButton}
				>
					{type === authConstants.LOGIN ? t('log in') : t('sign_up')}
				</Button>
				<AppLink
					className={cls.forgotPasswordButton}
					onClick={() => onClose(false)}
					href={'/forgotPassword'}
				>
					{t('Forgot your password?')}
				</AppLink>
				<Button
					onClick={() =>
						setIsFormType &&
						setIsFormType(
							type === authConstants.LOGIN
								? authConstants.SIGNUP
								: authConstants.LOGIN,
						)
					}
					className={cls.changeModeButton}
				>
					{type === authConstants.LOGIN ? t('sign_up') : t('log in')}
				</Button>
			</form>
		)
	},
)

export default AuthForm
