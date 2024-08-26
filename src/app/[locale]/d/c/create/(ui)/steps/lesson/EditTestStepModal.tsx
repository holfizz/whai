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

const EditTestStepModal = ({ isOpen, onClose, initialData, onSave, t }) => {
	const [originalData, setOriginalData] = useState(initialData) // State for original data
	const [name, setName] = useState(initialData.name)
	const [instructions, setInstructions] = useState(initialData.instructions)

	useEffect(() => {
		if (isOpen) {
			setOriginalData(initialData)
			setName(initialData.name)
			setInstructions(initialData.instructions)
		}
	}, [isOpen, initialData])

	const handleSave = () => {
		onSave({ name, instructions })
		onClose()
	}
	const handleBackName = () => {
		setName(originalData.name)
	}

	const handleBackInstructions = () => {
		setInstructions(originalData.instructions)
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
							{t('Edit test step details')}
						</ModalHeader>
						<ModalBody>
							<div className='flex justify-between items-start mb-4'>
								<div className='flex justify-end items-start w-[80%]'>
									<h1 className='text-medium font-medium text-gray-3 mr-3 w-[25%] text-end'>
										{t('Name')}
									</h1>
									<Textarea
										placeholder={t('Enter the step name')}
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
									<h1 className='text-medium font-medium text-gray-3 mr-3 w-[25%]'>
										{t('Instructions')}
									</h1>
									<Textarea
										placeholder={t('Enter the instructions')}
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
										value={instructions}
										onChange={e => setInstructions(e.target.value)}
									/>
								</div>

								<Button
									isIconOnly
									variant='circle'
									color='secondary'
									size={'sRound'}
									startContent={<BackArrow fontSize={20} />}
									onPress={handleBackInstructions}
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

export default EditTestStepModal
