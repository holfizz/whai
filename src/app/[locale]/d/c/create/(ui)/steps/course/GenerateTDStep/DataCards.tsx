import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import EditCourseModal from './EditTDModal'

const DataCards = ({
	mutationTDData,
	setSelectedCardIndex,
	selectedCardIndex,
	onEditSave,
	isLoading
}) => {
	const t = useTranslations('CreateCourse')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editData, setEditData] = useState({ title: '', description: '' })

	const handleEditClick = td => {
		setEditData(td)
		setIsModalOpen(true)
	}

	return (
		<>
			{isLoading && <DotsLoader />}
			{!isLoading &&
				mutationTDData &&
				mutationTDData.map((td, index) => (
					<div
						key={index}
						onClick={() => setSelectedCardIndex(index)}
						className={`w-full h-auto min-h-30 p-4 rounded-2xl cursor-pointer ${
							selectedCardIndex === index ? 'bg-decor-2' : 'bg-decor-3'
						}`}
					>
						<div className='w-full flex items-center justify-between'>
							<h1 className='text-xl font-medium'>{td.title}</h1>
							<Button
								color='white'
								size='sRound'
								variant='square'
								isIconOnly
								className='max-640:w-[35px] max-640:h-[35px] aspect-square'
								onClick={() => handleEditClick(td)}
								startContent={
									<HiPencil
										className='cursor-pointer'
										color='var(--color-decor-2)'
										fontSize={28}
									/>
								}
								isDisabled={selectedCardIndex !== index}
							></Button>
						</div>
						<p className='text-lg mt-2'>{td.description}</p>
					</div>
				))}
			<EditCourseModal
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

export default DataCards
