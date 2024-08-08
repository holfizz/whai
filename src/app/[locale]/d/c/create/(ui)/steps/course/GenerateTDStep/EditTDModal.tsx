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

const EditTDModal = ({ isOpen, onClose, initialData, onSave, t }) => {
	const [originalData, setOriginalData] = useState(initialData) // State for original data
	const [name, setName] = useState(initialData.title)
	const [description, setDescription] = useState(initialData.description)

	// Effect to reset the state when modal opens
	useEffect(() => {
		if (isOpen) {
			setOriginalData(initialData) // Update original data
			setName(initialData.title)
			setDescription(initialData.description)
		}
	}, [isOpen, initialData])

	// Handler for saving updates
	const handleSave = () => {
		onSave({ title: name, description })
		onClose()
	}

	// Handler to reset title to original state
	const handleBackName = () => {
		setName(originalData.title) // Rollback to the original title
	}

	// Handler to reset description to original state
	const handleBackDesc = () => {
		setDescription(originalData.description) // Rollback to the original description
	}

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
							{t('Edit title and description')}
						</ModalHeader>
						<ModalBody>
							<div className='flex justify-between items-start mb-4'>
								<div className='flex justify-end items-start w-[80%]'>
									<h1 className='text-medium font-medium text-gray-lg  mr-3 w-[25%] text-end'>
										{t('Title')}
									</h1>
									<Textarea
										placeholder={t('Enter the title')}
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
											]
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
										{t('Description')}
									</h1>
									<Textarea
										placeholder={t('Enter the description')}
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
											]
										}}
										minRows={3}
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
							<div className='flex justify-center items-center w-full'>
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

export default EditTDModal
