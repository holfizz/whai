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
						? 'text-success-10'
						: 'text-accent'
				} text-2xl max-md:text-5xl text-bold`}
			>
				{type === authConstants.LOGIN ? t('Log in') : t('Sign up')}
			</h1>

			{error && (
				<h1 className='text-xl max-md:text-2xl text-error-10'>
					{error?.message}
				</h1>
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
