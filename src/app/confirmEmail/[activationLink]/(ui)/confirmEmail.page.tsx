'use client'
import { useQuery } from '@tanstack/react-query'
import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { useAuthRedirect } from '@/shared/lib/hooks/useAuthRedirect'
import { usePathname } from 'next/navigation'
import { AuthApi } from '@/features/auth'

export default function ConfirmEmailPage() {
	useAuthRedirect()
	const { t } = useTranslation('confirmEmailPage')
	function getLastSegmentFromURL() {
		const url = usePathname()
		const segments = url.split('/')
		console.log(segments[segments.length - 1])
		return segments[segments.length - 1]
	}
	const activateEmailUrl = getLastSegmentFromURL() || ''
	const { data, isError } = useQuery({
		queryFn: () => AuthApi.activateEmail(activateEmailUrl),
		queryKey: [activateEmailUrl],
	})
	return (
		<div>
			{data && (
				<>
					<Text
						size={TextSize.XL}
						theme={TextTheme.SUCCESS}
						title={t(
							'Mail has been successfully activated. You can close the page',
						)}
					/>
				</>
			)}

			{isError && (
				<>
					<Text
						size={TextSize.XL}
						theme={TextTheme.ERROR}
						title={t('Mail is not activated. The link may have expired')}
					/>
				</>
			)}
		</div>
	)
}
