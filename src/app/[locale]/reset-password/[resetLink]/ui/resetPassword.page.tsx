'use client'
import { usePathname } from '@/navigation'
import { useAuthRedirect } from '@/shared/lib/hooks/useAuthRedirect'
import Input, { InputSize, InputTheme } from '@/shared/ui/Input/Input'
import Text, { TextAlign, TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'
import { z } from 'zod'

export default function ResetPasswordPage() {
	useAuthRedirect()
	const t = useTranslations('resetPasswordPage')
	function getLastSegmentFromURL() {
		const url = usePathname()
		const segments = url.split('/')
		return segments[segments.length - 1]
	}
	const resetPasswordUrl = getLastSegmentFromURL() || ''

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
				// resetPasswordMutation(validationResult.data as any)
			}
		}
	}
	return (
		<div>
			<form onSubmit={onSubmit}>
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
				{'error' && (
					<Text
						size={TextSize.S}
						theme={TextTheme.ERROR}
						text={formErrors?._errors.join(', ')}
					/>
				)}
				{'data' && (
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
						placeholder={t('Password...')}
						type='password'
					/>
				</label>
				<label>
					<Input
						size={InputSize.FULL}
						name={'passwordRepeat'}
						theme={InputTheme.OUTLINE}
						placeholder={t('Repeat password...')}
						type='password'
					/>
				</label>
				<Button type={'submit'}>{t('Reset the password')}</Button>
			</form>
		</div>
	)
}
