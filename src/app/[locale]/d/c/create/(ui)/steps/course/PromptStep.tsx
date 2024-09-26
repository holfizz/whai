import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { Textarea } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import useUnifiedStore from '../../../(model)/unified.state'

const PromptStep = () => {
	const t = useTranslations('CreateCourse')
	const {
		promptContent: storePromptContent,
		setPromptContent,
		nextStep,
		prevStep
	} = useUnifiedStore()
	const [promptContent, setLocalPromptContent] = useState(storePromptContent)

	const debouncedSetPromptContent = useDebounce(setPromptContent, 500)
	const [minRows, setMinRows] = useState(1)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 640) {
				setMinRows(3)
			} else {
				setMinRows(1)
			}
		}

		// Set initial value
		handleResize()

		// Add event listener for window resize
		window.addEventListener('resize', handleResize)

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	useEffect(() => {
		debouncedSetPromptContent(promptContent)
	}, [promptContent, debouncedSetPromptContent])

	return (
		<DashboardLayout>
			<div
				style={{ height: 'calc(100vh - var(--navbar-height))' }}
				className='w-full flex justify-center items-center flex-col'
			>
				<h1 className='text-2xl mb-20'>{t('What are we creating?')}</h1>
				<Textarea
					placeholder={t(
						'What should be in the know, describe in detail what you want to get'
					)}
					classNames={{
						inputWrapper: [
							'w-1/2',
							'py-[10px]',
							'px-[20px]',
							'rounded-3xl',
							'h-auto',
							'resize-horizontal',
							'overflow-x-auto',
							'whitespace-nowrap',
							'w-full'
						],
						innerWrapper: ['flex justify-between', 'h-auto', 'w-full'],
						input: [
							'w-full placeholder:text-medium text-medium data-[focus=true]:text-sm'
						],
						base: 'w-1/2 max-lg:w-[50vw] max-md:w-[70vw] max-640:w-[80vw] leading-none'
					}}
					minRows={minRows}
					value={promptContent}
					onChange={e => setLocalPromptContent(e.target.value)}
				/>
				<div className='mt-20 flex gap-4 max-640:flex-col max-640:w-full  max-640:items-center max-640:justify-center'>
					<Button
						className='max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[60vw]'
						color={'gray'}
						size={'3xl'}
						onClick={prevStep}
					>
						{t('Back')}
					</Button>
					<Button
						className='max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[60vw]'
						isDisabled={!promptContent?.length}
						color={'main'}
						size={'3xl'}
						onClick={nextStep}
					>
						{t('Next')}
					</Button>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default PromptStep
