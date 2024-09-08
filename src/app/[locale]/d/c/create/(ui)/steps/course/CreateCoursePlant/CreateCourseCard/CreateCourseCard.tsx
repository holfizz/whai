import PencilIcon from '@/shared/assets/icons/Pencil'
import logger from '@/shared/lib/utils/logger'

import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import { useState } from 'react'
import Button from '../../../../../../../../../../shared/ui/Button/Button'
import Icon from '../../../../../../../../../../shared/ui/Icon/Icon'
import cls from './CourseCard.module.scss'
import EditCourseModal from './EditCourseModal'

const CreateCourseCard = ({
	data,
	className,
	type,
	t,
	buttonText,
	handleClick,
	onCourseDataChange
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleSave = updatedCourse => {
		logger.log('Course updated:', updatedCourse)
		onCourseDataChange(updatedCourse)
	}

	return (
		<div
			className={`w-[390px] h-auto border-decor-1 border-1 rounded-xl flex flex-col overflow-hidden ${className}`}
		>
			<div className='p-4'>
				<div className='flex items-center justify-between'>
					<h1 className={`${cls.link} line-clamp-2`} onClick={handleClick}>
						{data?.name}
					</h1>
					<PencilIcon
						className='cursor-pointer'
						color='var(--color-decor-2)'
						fontSize={28}
						onClick={() => setIsModalOpen(true)}
					/>
				</div>
				<p className={`${cls.paragraph} line-clamp-3`}>{data?.description}</p>
			</div>

			<Button
				onClick={handleClick}
				className='mt-auto'
				variant='noneRound'
				color='secondary'
				size='full'
				endContent={<Icon SVG={ArrowUpRight} />}
			>
				<h1>{buttonText}</h1>
			</Button>

			<EditCourseModal
				t={t}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				data={data}
				onSave={handleSave}
				type={type}
			/>
		</div>
	)
}

export default CreateCourseCard
