'use client'
import { AuthApi } from '@/features/auth'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAuthRedirect } from '@/shared/lib/hooks/useAuthRedirect'
import Input, { InputSize, InputTheme } from '@/shared/ui/Input/Input'
import Text, { TextAlign, TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { Button } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'
import { z } from 'zod'
import cls from './forgotPassword.module.scss'

export default function ForgotPasswordPage() {
	useAuthRedirect()
	const t = useTranslations('forgotPasswordPage')
	const [formErrors, setFormErrors] = useState<
		z.ZodFormattedError<
			{
				email: string
			},
			string
		>
	>({ _errors: [] })
	const {
		mutate: forgotPasswordMutate,
		error,
		data,
	} = useMutation<
		any,
		AxiosError<{
			message: string
		}>
	>({
		mutationKey: ['user'],
		mutationFn: (formData: any) => AuthApi.forgotPassword(formData),
	})
	const formSchema = z.object({
		email: z.string().email('Email is not correct'),
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
			forgotPasswordMutate(validationResult.data as any)
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
				{error && (
					<Text
						theme={TextTheme.ERROR}
						text={error?.response?.data?.message}
						size={TextSize.L}
					/>
				)}
				{data && (
					<Text
						align={TextAlign.CENTER}
						theme={TextTheme.SUCCESS}
						title={t('Message in your mail')}
						text={t("If it's not there, check your spam folder.")}
						size={TextSize.S}
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
				<Button type={'submit'}>{t('Confirm your email')}</Button>
			</form>
		</div>
	)
}
