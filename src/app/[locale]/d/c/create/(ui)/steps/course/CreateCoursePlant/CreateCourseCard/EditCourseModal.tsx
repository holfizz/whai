import BackArrow from '@/shared/assets/icons/BackArrow'
import Button from '@/shared/ui/Button/Button'
import { Modal, ModalContent } from '@/shared/ui/Modal/Modal'
import {
	ModalBody,
	ModalFooter,
	ModalHeader,
	Textarea
} from '@nextui-org/react'
import { useEffect, useState } from 'react'

const EditCourseModal = ({ isOpen, onClose, data, onSave, type, t }) => {
	const [originalData, setOriginalData] = useState(data) // Стили для хранения оригинальных данных
	const [name, setName] = useState(data.name)
	const [description, setDescription] = useState(data.description)

	useEffect(() => {
		if (isOpen) {
			setOriginalData(data)
			setName(data.name)
			setDescription(data.description)
		}
	}, [isOpen, data])

	const handleSave = () => {
		onSave({ id: data.id, name, description }) // Ensure the id is retained
		onClose()
	}

	const handleBackName = () => {
		setName(originalData.name)
	}

	const handleBackDesc = () => {
		setDescription(originalData.description)
	}

	const promptText =
		type === 'module'
			? t('module')
			: type === 'lesson'
			? t('lesson')
			: t('topic')

	return (
		<Modal
			scrollBehavior='inside'
			size='lg'
			color='white'
			isOpen={isOpen}
			onOpenChange={onClose}
		>
			<ModalContent color='white'>
				{() => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							{t('Edit Course')}
						</ModalHeader>
						<ModalBody>
							<div className='flex justify-between items-start'>
								<div className='flex justify-end items-center w-[80%]'>
									<h1 className='text-medium font-medium text-gray-lg  mr-3 w-[25%] text-end'>
										{promptText}
									</h1>
									<Textarea
										placeholder={t(
											'What should be in the know, describe in detail what you want to get'
										)}
										classNames={{
											inputWrapper: [
												'py-[10px]',
												'px-[20px]',
												'rounded-xl',
												'bg-white',
												'data-[hover=true]:bg-white',
												'data-[focus=true]:bg-red',
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
											base: 'w-[85%]'
										}}
										minRows={1}
										value={name}
										onChange={e => setName(e.target.value)}
									/>
								</div>
								<Button
									isIconOnly
									variant='circle'
									color='secondary'
									size={'sRound'}
									startContent={<BackArrow fontSize={20} />}
									onPress={handleBackName}
								/>
							</div>
							<div className='flex justify-between items-start'>
								<div className='flex justify-end items-start w-[80%]'>
									<h1 className='text-medium font-medium text-gray-lg  mr-3 w-[25%]'>
										{t('description')}
									</h1>
									<Textarea
										placeholder={t(
											'What should be in the know, describe in detail what you want to get'
										)}
										classNames={{
											inputWrapper: [
												'py-[10px]',
												'px-[20px]',
												'rounded-3xl',
												'bg-white',
												'data-[hover=true]:bg-white',
												'data-[focus=true]:bg-red',
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
											base: 'w-[85%]'
										}}
										minRows={1}
										value={description}
										onChange={e => setDescription(e.target.value)}
									/>
								</div>
								<Button
									isIconOnly
									variant='circle'
									color='secondary'
									size={'sRound'}
									startContent={<BackArrow fontSize={20} />}
									onPress={handleBackDesc}
								/>
							</div>
						</ModalBody>
						<ModalFooter>
							<div className='w-full flex items-center justify-center'>
								<Button size={'3xl'} color='main' onPress={handleSave}>
									{t('Save')}
								</Button>
							</div>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default EditCourseModal