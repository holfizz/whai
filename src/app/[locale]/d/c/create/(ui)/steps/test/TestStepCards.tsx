import PencilIcon from '@/shared/assets/icons/Pencil'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import EditTestStepModal from './EditTestStepModal'

const TestStepCards = ({
	testStepsData,
	setSelectedCardIndex,
	selectedCardIndex,
	onEditSave,
	isLoading
}) => {
	const t = useTranslations('CreateCourse')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editData, setEditData] = useState({ name: '', instructions: '' })

	const handleEditClick = step => {
		setEditData(step)
		setIsModalOpen(true)
	}

	return (
		<>
			{isLoading && <DotsLoader />}
			{!isLoading &&
				testStepsData &&
				testStepsData.map((step, index) => (
					<div
						key={index}
						onClick={() => setSelectedCardIndex(index)}
						className={`w-full h-auto min-h-30 p-4 rounded-2xl cursor-pointer ${
							selectedCardIndex === index ? 'bg-decor-2' : 'bg-decor-3'
						}`}
					>
						<div className='w-full flex items-center justify-between'>
							<h1 className='text-xl font-medium'>{step.name}</h1>
							<Button
								color='white'
								size='sRound'
								variant='square'
								isIconOnly
								onClick={() => handleEditClick(step)}
								startContent={
									<PencilIcon
										className='cursor-pointer'
										color='var(--color-decor-2)'
										fontSize={28}
									/>
								}
								isDisabled={selectedCardIndex !== index}
							></Button>
						</div>
						<p className='text-lg mt-2'>{step.instructions}</p>
					</div>
				))}
			<EditTestStepModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				initialData={editData}
				onSave={updatedData => {
					onEditSave(updatedData, selectedCardIndex)
					setIsModalOpen(false)
				}}
				t={t}
			/>
		</>
	)
}

export default TestStepCards
