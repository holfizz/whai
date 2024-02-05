'use client'
import { useQuery } from '@tanstack/react-query'
import { AuthService } from '@/shared/api/auth/auth.service'
import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { useAuthRedirect } from '@/shared/lib/hooks/useAuthRedirect'

export default function ConfirmEmailPage() {
	useAuthRedirect()

	const { t } = useTranslation('confirmEmailPage')

	function getLastSegmentFromURL() {
		if (typeof window !== 'undefined') {
			// const pathname = usePathname()
			const url = window.location.href
			const segments = url.split('/')
			return segments[segments.length - 1]
		}
	}

	const activateEmailUrl = getLastSegmentFromURL() || ''
	const { data, isError } = useQuery({
		queryFn: () => AuthService.activateEmail(activateEmailUrl),
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
							'Mail has been successfully activated. You can close the link',
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
