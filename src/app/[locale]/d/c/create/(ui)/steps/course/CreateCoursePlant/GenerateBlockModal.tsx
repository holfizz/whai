import { GENERATE_BLOCKS } from '@/entities/titleDescription'
import Button from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/InputUI'
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
import { useState } from 'react'

const GenerateBlockModal = ({ isOpen, onClose, onSave, type }) => {
	const t = useTranslations('CreateCoursePlanPage')
	const [mode, setMode] = useState('manual')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [userRequest, setUserRequest] = useState('')
	const [isAutofill, setIsAutofill] = useState(true)

	const [generateBlocks] = useMutation(GENERATE_BLOCKS, {
		onCompleted: data => {
			onSave(data.generateBlocks)
			onClose()
		},
		onError: error => {
			console.error('Error generating blocks:', error)
		}
	})

	const handleSubmit = () => {
		const blockInput = {
			courseId: 'some-course-id', // replace with actual courseId
			topicId: 'id', // Dynamically set the ID based on the type
			subtopicId: 'id', // Dynamically set the ID based on the type
			userRequest,
			type,
			isAutofill
		}

		// if (mode === 'manual') {
		// 	blockInput.name = title
		// 	blockInput.description = description
		// } else {
		// 	blockInput.name = userRequest // adjust according to actual needs
		// 	blockInput.description = ''
		// }

		generateBlocks({ variables: { blockInput } })
	}

	return (
		<Modal color='white' isOpen={isOpen} onOpenChange={onClose}>
			<ModalContent color='white'>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							<h2 className='text-xl'>{t('Add new module')}</h2>
						</ModalHeader>
						<ModalBody>
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
										<span className='font-medium ml-1 mb-2'>{t('title')}:</span>
										<Input
											type='text'
											size='full'
											value={title}
											classNames={{
												inputWrapper: 'h-[60px] rounded-3xl',
												input: 'pl-4'
											}}
											onChange={e => setTitle(e.target.value)}
											className='w-full h-[60px] !rounded-3xl'
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
											minRows={1}
											value={description}
											onChange={e => setDescription(e.target.value)}
											className='w-full'
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
											onChange={e => setUserRequest(e.target.value)}
											className='w-full'
										/>
									</label>
									<label className='flex items-center mt-2'>
										<Checkbox
											size='md'
											className='w-full max-w-full text-lg flex items-start my-2'
											checked={isAutofill}
											onChange={() => setIsAutofill(!isAutofill)}
											classNames={{
												wrapper: 'after:bg-decor-2 min-w-[20px] min-h-[20px]'
											}}
											value='policyAccepted'
										>
											{t('Enable Autofill')}
										</Checkbox>
									</label>
								</div>
							)}
						</ModalBody>
						<ModalFooter>
							<Button
								className={'rounded-2xl'}
								color='error'
								variant='light'
								onPress={onClose}
							>
								Close
							</Button>
							<Button
								className={'rounded-2xl'}
								color='primary'
								onPress={handleSubmit}
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
