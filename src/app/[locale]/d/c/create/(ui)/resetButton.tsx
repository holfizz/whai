import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import useUnifiedStore from '../(model)/unified.state'
const ResetButton = () => {
	const { resetState } = useUnifiedStore()
	const t = useTranslations('CreateCourse')
	return (
		<Button
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
