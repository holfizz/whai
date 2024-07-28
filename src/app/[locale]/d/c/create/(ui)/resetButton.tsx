import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import useCourseStore from '../(model)/create-page.store'
const ResetButton = () => {
	const { resetState } = useCourseStore()
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
