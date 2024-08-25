import { FC, useState } from 'react'

import { useTranslations } from 'next-intl'
import { z } from 'zod'
import cls from '../AuthForm/AuthForm.module.scss'
import InputField from '../InputLabel/InputField'

import { Input } from '@/shared/ui/Input/InputUI'
import { HiOutlineEye } from 'react-icons/hi'
import { PiEyeClosedBold } from 'react-icons/pi'

interface BasicInputsProps {
	formErrors: z.ZodFormattedError<
		{
			email: string
			password: string
			phoneNumber?: string | undefined
			firstName?: string | undefined
			lastName?: string | undefined
		},
		string
	>
}

const BasicInputs: FC<BasicInputsProps> = ({ formErrors }) => {
	const t = useTranslations('auth')
	const tAuthValidation = useTranslations('authValidation')

	const [isVisible, setIsVisible] = useState(false)

	const toggleVisibility = () => setIsVisible(!isVisible)

	return (
		<>
			<InputField
				className={cls.label}
				name={'email'}
				type='email'
				label={t('Email')}
				color={formErrors.email?._errors.length ? 'danger' : 'white'}
				errorMessage={formErrors.email?._errors
					?.map((error: any) => tAuthValidation(error))
					.join(', ')}
				placeholder={t('Enter your email')}
			/>

			<label className={cls.label}>
				<div className={cls.passwordInput}>
					<Input
						classNames={{
							innerWrapper: 'py-3 px-2 h-[60px]',
							inputWrapper: 'h-auto overflow-hidden',
							input: 'max-md:text-2xl'
						}}
						placeholder={t('Enter your password')}
						radius='roundedFull'
						endContent={
							<button
								className='focus:outline-none'
								type='button'
								onClick={toggleVisibility}
							>
								{isVisible ? (
									<HiOutlineEye className='text-2xl max-md:text-4xl text-default-400 pointer-events-none' />
								) : (
									<PiEyeClosedBold className='text-2xl max-md:text-4xl text-default-400 pointer-events-none' />
								)}
							</button>
						}
						color={formErrors.password?._errors.length ? 'danger' : 'white'}
						errorMessage={formErrors.password?._errors
							?.map((error: any) => tAuthValidation(error))
							.join(', ')}
						type={isVisible ? 'text' : 'password'}
						name='password'
					/>
				</div>
			</label>
		</>
	)
}

export default BasicInputs
