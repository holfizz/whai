import { GENERATE_BLOCKS } from '@/entities/titleDescription'
import Button from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/InputUI'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { Modal, ModalContent } from '@/shared/ui/Modal/Modal'
import { useMutation } from '@apollo/client'
import {
	Checkbox,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Textarea
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

const GenerateBlockModal = ({
	isOpen,
	onClose,
	onSave,
	type,
	courseId,
	topicId,
	subtopicId
}: {
	isOpen
	onClose
	onSave
	type
	courseId?: string
	topicId?: string
	subtopicId?: string
}) => {
	const t = useTranslations('CreateCoursePlanPage')
	const [mode, setMode] = useState('manual')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [userRequest, setUserRequest] = useState('')
	const [isAutofill, setIsAutofill] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const [generateBlocks, { data, error, loading }] = useMutation(
		GENERATE_BLOCKS,
		{
			onCompleted: data => {
				onSave(data.generateBlocks)
				onClose()
			},
			onError: error => {
				console.error('Error generating blocks:', error)
				setErrorMessage(error.message)
			}
		}
	)

	const handleSubmit = () => {
		const blockInput = {
			courseId: type === 'subtopic' ? null : courseId,
			topicId: type === 'lesson' ? null : type === 'topic' ? null : topicId,
			subtopicId: type === 'topic' ? null : subtopicId,
			userRequest,
			type,
			isAutofill: type === 'lesson' ? false : isAutofill
		}

		// Clear state before request
		setErrorMessage('')
		setTitle('')
		setDescription('')
		setUserRequest('')

		generateBlocks({ variables: { blockInput } })
	}

	useEffect(() => {
		if (data) {
			window.location.reload()
		}
	}, [data])

	// Handlers to clear error message when typing starts
	const handleTitleChange = e => {
		setTitle(e.target.value)
		setErrorMessage('')
	}

	const handleDescriptionChange = e => {
		setDescription(e.target.value)
		setErrorMessage('')
	}

	const handleUserRequestChange = e => {
		setUserRequest(e.target.value)
		setErrorMessage('')
	}

	return (
		<Modal color='white' isOpen={isOpen} onOpenChange={onClose}>
			<ModalContent
				onClick={e => {
					e.stopPropagation()
				}}
				color='white'
			>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							{type === 'topic' && (
								<h2 className='text-xl'>{t('Add new module')}</h2>
							)}
							{type === 'subtopic' && (
								<h2 className='text-xl'>{t('Add new topic')}</h2>
							)}
							{type === 'lesson' && (
								<h2 className='text-xl'>{t('Add new lesson')}</h2>
							)}
							{errorMessage && (
								<p className='text-error-10 text-sm font-medium'>
									{t(
										'An error occurred during creation, please try again or try again later'
									)}
								</p>
							)}
						</ModalHeader>
						<ModalBody>
							{loading ? (
								<DotsLoader />
							) : (
								<>
									<div className='flex gap-4 mb-4'>
										<Button
											className='rounded-2xl'
											onPress={() => setMode('manual')}
											color={mode === 'manual' ? 'primary' : 'gray'}
										>
											{t('Manual')}
										</Button>
										<Button
											className='rounded-2xl'
											onPress={() => setMode('ai')}
											color={mode === 'ai' ? 'primary' : 'gray'}
										>
											{t('From AI')}
										</Button>
									</div>
									{mode === 'manual' && (
										<div className='mb-4'>
											<label className='block mb-2'>
												<span className='font-medium ml-1 mb-2'>
													{t('title')}:
												</span>
												<Input
													type='text'
													size='full'
													value={title}
													classNames={{
														inputWrapper: 'h-[40px] rounded-3xl',
														input: 'pl-4'
													}}
													onChange={handleTitleChange}
													className='w-full h-[60px] !rounded-3xl'
													disabled={loading} // Disable during loading
												/>
											</label>
											<label className='block mb-2'>
												<span className='font-medium ml-1 mb-2'>
													{t('description')}:
												</span>
												<Textarea
													placeholder={
														t(
															'What should be in the know, describe in detail what you want to get'
														) as any
													}
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
														innerWrapper: [
															'flex justify-between',
															'h-auto',
															'w-full'
														],
														input: ['w-full'],
														base: 'w-1/2 max-lg:w-[60vw]'
													}}
													minRows={2}
													value={description}
													onChange={handleDescriptionChange}
													className='w-full'
													disabled={loading} // Disable during loading
												/>
											</label>
										</div>
									)}
									{mode === 'ai' && (
										<div className='mb-4'>
											<label className='block mb-2'>
												<Textarea
													placeholder={
														t(
															'What should be in the know, describe in detail what you want to get'
														) as any
													}
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
														innerWrapper: [
															'flex justify-between',
															'h-auto',
															'w-full'
														],
														input: ['w-full'],
														base: 'w-1/2 max-lg:w-[60vw]'
													}}
													minRows={1}
													value={userRequest}
													onChange={handleUserRequestChange}
													className='w-full'
													disabled={loading} // Disable during loading
												/>
											</label>
											<label className='flex items-center mt-2'>
												{type !== 'lesson' && (
													<Checkbox
														size='md'
														className='w-full max-w-full text-lg flex items-start my-2'
														checked={isAutofill}
														onChange={() => setIsAutofill(!isAutofill)}
														classNames={{
															wrapper:
																'after:bg-decor-2 min-w-[20px] min-h-[20px]'
														}}
														value='policyAccepted'
														disabled={loading} // Disable during loading
													>
														{t('Enable Autofill')}
													</Checkbox>
												)}
											</label>
										</div>
									)}
								</>
							)}{' '}
							{/* Loading state */}
						</ModalBody>
						<ModalFooter>
							<Button
								className={'rounded-2xl'}
								color='error'
								variant='light'
								onPress={onClose}
								disabled={loading} // Disable during loading
								style={{ opacity: loading ? 0.5 : 1 }} // Adjust opacity during loading
							>
								Close
							</Button>
							<Button
								className={'rounded-2xl'}
								color='primary'
								onPress={handleSubmit}
								disabled={loading} // Disable during loading
								style={{ opacity: loading ? 0.5 : 1 }} // Adjust opacity during loading
							>
								Save
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default GenerateBlockModal
