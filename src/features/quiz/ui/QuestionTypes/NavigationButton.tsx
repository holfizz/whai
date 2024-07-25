import Button from '@/shared/ui/Button/Button' // Adjust import path as necessary
import { useTranslations } from 'next-intl'
import React from 'react'

interface NavigationButtonsProps {
	onPrev: () => void
	onNext: () => void
	isFirstQuestion: boolean
	isLastQuestion: boolean
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
	onPrev,
	onNext,
	isFirstQuestion,
	isLastQuestion
}) => {
	const t = useTranslations('Quiz')
	return (
		<div className='flex gap-4 mt-60'>
			{!isFirstQuestion && (
				<Button size={'3xl'} color={'gray'} onClick={onPrev}>
					{t('Back')}
				</Button>
			)}
			{isLastQuestion ? (
				<Button size={'3xl'} color={'main'} onClick={onNext}>
					{t('Finish')}
				</Button>
			) : (
				<Button size={'3xl'} color={'main'} onClick={onNext}>
					{t('Next')}
				</Button>
			)}
		</div>
	)
}

export default NavigationButtons
