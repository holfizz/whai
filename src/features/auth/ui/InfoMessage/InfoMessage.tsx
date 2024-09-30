import { FC } from 'react'

import { authConstants } from '@/shared/const/auth'
import { useTranslations } from 'next-intl'
import {
	LoginMutationResponse,
	SignUpMutationResponse
} from '../../model/auth.queries'

interface InfoMessageProps {
	error?: any
	data: LoginMutationResponse | SignUpMutationResponse
	type: authConstants
}

const InfoMessage: FC<InfoMessageProps> = ({ error, data, type }) => {
	const t = useTranslations('auth')

	return (
		<>
			<h1
				className={`${
					error?.message
						? 'text-red-400'
						: data
						? 'text-decor-2'
						: 'text-accent'
				} text-2xl max-md:text-5xl text-bold text-center`}
			>
				{type === authConstants.LOGIN ? t('Log in') : t('Sign up')}
			</h1>
			{error && (
				<p className='text-lg max-md:text-2xl text-error-10 text-center'>
					{(() => {
						switch (true) {
							case error.message ===
								'Пользователь с таким email уже существует':
								return t(
									'A user with this email already exists, enter a different address or check the message in the mail'
								)
							case error.message === 'Подтвердите почту':
								return t('Confirm your email')

							case type === authConstants.LOGIN:
								return t(
									'There was an error logging in, please check your email address and password and try again'
								)

							default:
								return t(
									'An error occurred during registration, check your email and password and try again'
								)
						}
					})()}
				</p>
			)}

			{type === authConstants.SIGNUP && data && (
				<h1 className='text-success-text text-xl max-md:text-2xl text-center'>
					{t('Confirm your email')}
				</h1>
			)}
		</>
	)
}

export default InfoMessage
