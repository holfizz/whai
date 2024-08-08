import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'

interface NavigationButtonsProps {
	onPrev: () => void
	onNext: () => void
	onCheck: () => void
	isFirstQuestion: boolean
	isLastQuestion: boolean
	isChecked: boolean
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
	onPrev,
	onNext,
	onCheck,
	isFirstQuestion,
	isLastQuestion,
	isChecked
}) => {
	const t = useTranslations('Quiz')
	const { back } = useRouter()
	return (
		<div className='flex gap-4 mt-60'>
			{
				<Button
					size={'3xl'}
					color={'gray'}
					onClick={() => {
						onPrev()
						isFirstQuestion && back()
					}}
				>
					{t('Back')}
				</Button>
			}
			{!isChecked && (
				<Button size={'3xl'} color={'main'} onClick={onCheck}>
					{t('Check')}
				</Button>
			)}
			{isChecked && (
				<Button
					size={'3xl'}
					color={'main'}
					onPress={onNext}
					disabled={isLastQuestion}
				>
					{isLastQuestion ? t('Finish') : t('Next')}
				</Button>
			)}
		</div>
	)
}

export default NavigationButtons
