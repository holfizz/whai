'use client'
import { AuthApi } from '@/features/auth'
import { useAuthRedirect } from '@/shared/lib/hooks/useAuthRedirect'
import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

export default function ConfirmEmailPage() {
	useAuthRedirect()
	const t = useTranslations('confirmEmailPage')
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
