'use client'
import { useMutation } from '@tanstack/react-query'
import { AuthApi } from '@/features/auth'
import { useTranslation } from 'react-i18next'
import { useAuthRedirect } from '@/shared/lib/hooks/useAuthRedirect'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from '@/app/forgotPassword/ui/forgotPassword.module.scss'
import Text, { TextAlign, TextSize, TextTheme } from '@/shared/ui/Text/Text'
import Input, { InputSize, InputTheme } from '@/shared/ui/Input/Input'
import Button, { ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { FormEvent, useState } from 'react'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { usePathname } from 'next/navigation'

export default function ResetPasswordPage() {
	useAuthRedirect()
	const { t } = useTranslation('resetPasswordPage')
	function getLastSegmentFromURL() {
		const url = usePathname()
		const segments = url.split('/')
		return segments[segments.length - 1]
	}
	const resetPasswordUrl = getLastSegmentFromURL() || ''
	const {
		mutate: resetPasswordMutation,
		error,
		data,
	} = useMutation<any, AxiosError<{ message: string }>>({
		mutationFn: (data: any) => AuthApi.resetPassword(resetPasswordUrl, data),
		mutationKey: [resetPasswordUrl],
	})
	const [formErrors, setFormErrors] = useState<
		z.ZodFormattedError<
			{
				password: string
				passwordRepeat: string
			},
			string
		>
	>({ _errors: [] })

	const formSchema = z.object({
		password: z
			.string()
			.min(6, { message: t('The password must be at least 6 characters') }),
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
			if (formData.password !== formData.passwordRepeat) {
				setFormErrors({
					_errors: [t('The passwords must match')],
				})
			} else {
				setFormErrors({ _errors: [] })
				resetPasswordMutation(validationResult.data as any)
			}
		}
	}
	return (
		<div className={cls.wrapper}>
			<form onSubmit={onSubmit} className={classNames(cls.RecoverForm, {}, [])}>
				<Text
					align={TextAlign.CENTER}
					size={TextSize.L}
					title={t('Password recovery form')}
				/>
				{formErrors.password?._errors && (
					<Text
						size={TextSize.S}
						theme={TextTheme.ERROR}
						text={formErrors.password?._errors.join(', ')}
					/>
				)}
				{formErrors?._errors && (
					<Text
						size={TextSize.S}
						theme={TextTheme.ERROR}
						text={formErrors?._errors.join(', ')}
					/>
				)}
				{error && (
					<Text
						size={TextSize.S}
						theme={TextTheme.ERROR}
						text={formErrors?._errors.join(', ')}
					/>
				)}
				{data && (
					<Text
						size={TextSize.S}
						theme={TextTheme.SUCCESS}
						text={t('Password changed successfully')}
					/>
				)}
				<label>
					<Input
						size={InputSize.FULL}
						name={'password'}
						theme={InputTheme.OUTLINE}
						className={cls.input}
						placeholder={t('Password...')}
						type='password'
					/>
				</label>
				<label>
					<Input
						size={InputSize.FULL}
						name={'passwordRepeat'}
						theme={InputTheme.OUTLINE}
						className={cls.input}
						placeholder={t('Repeat password...')}
						type='password'
					/>
				</label>
				<Button
					type={'submit'}
					size={ButtonSize.FULL}
					theme={ButtonTheme.OUTLINE}
				>
					{t('Reset the password')}
				</Button>
			</form>
		</div>
	)
}
