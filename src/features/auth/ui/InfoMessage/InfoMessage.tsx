import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { FC } from 'react'

import { authConstants } from '@/shared/const/auth'
import { useTranslations } from 'next-intl'
import {
	LoginMutationResponse,
	SignUpMutationResponse,
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
				<Text theme={TextTheme.ERROR} text={error?.message} size={TextSize.L} />
			)}

			{type === authConstants.SIGNUP && data && (
				<Text
					theme={TextTheme.SUCCESS}
					text={t('Confirm your email')}
					size={TextSize.L}
				/>
			)}
		</>
	)
}

export default InfoMessage
