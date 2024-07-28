import useCourseStore from '@/app/[locale]/d/c/create/(model)/create-page.store'
import { Link } from '@/navigation'
import { getDashboardRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import React from 'react'

const ChoiceStep = () => {
	const [selectedChoice, setSelectedChoice] = React.useState(null)
	const nextStep = useCourseStore(state => state.nextStep)
	const setChoice = useCourseStore(state => state.setChoice)

	const t = useTranslations('CreateCourse')

	const handleChoice = choice => {
		setSelectedChoice(choice)
	}

	const handleNext = () => {
		if (selectedChoice) {
			setChoice(selectedChoice)
			nextStep()
		}
	}

	return (
		<DashboardLayout>
			<div
				style={{ height: 'calc(100vh - var(--navbar-height))' }}
				className='w-full flex justify-center items-center flex-col'
			>
				<h1>{t('What are we creating?')}</h1>
				<div className='flex gap-4'>
					<Button
						color={'secondary'}
						size={'3xl'}
						onClick={() => handleChoice('Course')}
						className={
							selectedChoice === 'Course'
								? ''
								: selectedChoice
								? 'opacity-50'
								: 'opacity-100'
						}
					>
						{t('Course')}
					</Button>
					<Button
						color={'secondary'}
						size={'3xl'}
						onClick={() => handleChoice('Lesson')}
						className={
							selectedChoice === 'Lesson'
								? ''
								: selectedChoice
								? 'opacity-50'
								: 'opacity-100'
						}
					>
						{t('Lesson')}
					</Button>
					<Button
						color={'secondary'}
						size={'3xl'}
						onClick={() => handleChoice('Test')}
						className={
							selectedChoice === 'Test'
								? ''
								: selectedChoice
								? 'opacity-50'
								: 'opacity-100'
						}
					>
						{t('Test')}
					</Button>
				</div>
				<div className='mt-20'>
					<Button
						as={Link}
						href={getDashboardRoute()}
						color={'accent'}
						size={'3xl'}
						onClick={handleNext}
					>
						{t('Back')}
					</Button>{' '}
					<Button
						isDisabled={!selectedChoice}
						color={'accent'}
						size={'3xl'}
						onClick={handleNext}
					>
						{t('Next')}
					</Button>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default ChoiceStep
