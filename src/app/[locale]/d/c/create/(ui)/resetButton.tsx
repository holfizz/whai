import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import useUnifiedStore from '../(model)/unified.state'
const ResetButton = ({ isLoading }: { isLoading?: boolean }) => {
	const { resetState } = useUnifiedStore()
	const t = useTranslations('CreateCourse')
	return (
		<Button
			isDisabled={isLoading}
			size={'3xl'}
			color={'gray'}
			onClick={() => {
				resetState()
			}}
		>
			{t('Reset')}
		</Button>
	)
}

export default ResetButton
