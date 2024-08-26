import { Link } from '@/navigation'
import { getDashboardRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import React from 'react'
import useUnifiedStore from '../../(model)/unified.state'

const ChoiceStep = () => {
	const [selectedChoice, setSelectedChoice] = React.useState<string | null>(
		null
	)
	const { step, setStep, setChoice, nextStep, prevStep } = useUnifiedStore(
		state => ({
			step: state.step,
			setStep: state.setStep,
			setChoice: state.setChoice,
			nextStep: state.nextStep,
			prevStep: state.prevStep
		})
	)

	const t = useTranslations('CreateCourse')

	const handleChoice = (choice: string) => {
		setSelectedChoice(choice)
	}

	const handleNext = () => {
		if (selectedChoice) {
			setChoice(selectedChoice)
			nextStep()
		}
	}
	const adaptiveStyleButton =
		' max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[80vw]'
	return (
		<DashboardLayout>
			<div
				style={{ height: 'calc(100vh - var(--navbar-height))' }}
				className='w-full flex justify-center items-center flex-col'
			>
				<h1>{t('What are we creating?')}</h1>
				<div className='flex gap-4 max-640:flex-col max-640:w-full  max-640:items-center max-640:justify-center'>
					<Button
						color={'secondary'}
						size={'3xl'}
						onClick={() => handleChoice('Course')}
						className={`${
							selectedChoice === 'Course'
								? ''
								: selectedChoice
								? 'opacity-50'
								: 'opacity-100'
						} ${adaptiveStyleButton} `}
					>
						{t('Course')}
					</Button>
					<Button
						color={'secondary'}
						size={'3xl'}
						onClick={() => handleChoice('Test')}
						className={`${
							selectedChoice === 'Test'
								? ''
								: selectedChoice
								? 'opacity-50'
								: 'opacity-100'
						}  ${adaptiveStyleButton}`}
					>
						{t('Test')}
					</Button>
					<Button
						color={'secondary'}
						size={'3xl'}
						onClick={() => handleChoice('Lesson')}
						className={`
							${
								selectedChoice === 'Lesson'
									? ''
									: selectedChoice
									? 'opacity-50'
									: 'opacity-100'
							} ${adaptiveStyleButton}
						`}
					>
						{t('Lesson')}
					</Button>
				</div>
				<div className='flex mt-20 gap-4 max-640:flex-col max-640:w-full  max-640:items-center max-640:justify-center'>
					<Button
						className={`${adaptiveStyleButton}`}
						as={Link}
						href={getDashboardRoute()}
						color={'gray'}
						size={'3xl'}
						onClick={prevStep}
					>
						{t('Back')}
					</Button>{' '}
					<Button
						className={`${adaptiveStyleButton}`}
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
