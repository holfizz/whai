import { FC } from 'react'
import cls from '../AuthForm/AuthForm.module.scss'

import { authConstants } from '@/shared/const/auth'
import InputField from '../InputLabel/InputField'

import { useTranslations } from 'next-intl'
import { z } from 'zod'

interface RegistrationInputsProps {
	type: authConstants
	formErrors: z.ZodFormattedError<
		{
			email: string
			password: string
			phoneNumber?: string
			firstName?: string
			lastName?: string
		},
		string
	>
}

const RegistraionInputs: FC<RegistrationInputsProps> = ({
	type,
	formErrors
}) => {
	const t = useTranslations('auth')
	const tAuthValidation = useTranslations('authValidation')

	return (
		<>
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
						errorMessage={formErrors.phoneNumber?._errors
							?.map((error: any) => tAuthValidation(error))
							.join(', ')}
						placeholder={t('Enter your phone number')}
					/>
					<InputField
						className={cls.label}
						name={'firstName'}
						label={t('First Name')}
						type='text'
						color={formErrors.firstName?._errors.length ? 'danger' : 'default'}
						errorMessage={formErrors.firstName?._errors
							?.map((error: any) => tAuthValidation(error))
							.join(', ')}
						placeholder={t('Enter your first name')}
					/>
					<InputField
						className={cls.label}
						name={'lastName'}
						label={t('Last Name')}
						type='text'
						color={formErrors.lastName?._errors.length ? 'danger' : 'default'}
						errorMessage={formErrors.lastName?._errors
							?.map((error: any) => tAuthValidation(error))
							.join(', ')}
						placeholder={t('Enter your last name')}
					/>
				</>
			)}
		</>
	)
}

export default RegistraionInputs
