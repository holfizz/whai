import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import Button from '@/shared/ui/Button/Button'
import { Textarea } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import useCourseStore from '../../(model)/createPage.state'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'

const PromptStep = () => {
	const t = useTranslations('CreateCourse')
	const storePromptContent = useCourseStore(state => state.promptContent)
	const setPromptContent = useCourseStore(state => state.setPromptContent)
	const [promptContent, setLocalPromptContent] = useState(storePromptContent)
	const nextStep = useCourseStore(state => state.nextStep)
	const prevStep = useCourseStore(state => state.prevStep)

	const debouncedSetPromptContent = useDebounce(setPromptContent, 500)

	useEffect(() => {
		debouncedSetPromptContent(promptContent)
	}, [promptContent, debouncedSetPromptContent])

	return (
		<DashboardLayout>
			<div
				style={{ height: 'calc(100vh - var(--navbar-height))' }}
				className='w-full flex justify-center items-center flex-col'
			>
				<h1>{t('What are we creating?')}</h1>
				<Textarea
					placeholder={t(
						'What should the course be about, describe in detail what you want to receive'
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
						input: ['w-full'],
						base: 'w-1/2'
					}}
					minRows={1}
					value={promptContent}
					onChange={e => setLocalPromptContent(e.target.value)}
				/>
				<div className='mt-20 flex gap-4'>
					<Button color={'gray'} size={'3xl'} onClick={prevStep}>
						{t('Back')}
					</Button>
					<Button
						isDisabled={!promptContent.length}
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
