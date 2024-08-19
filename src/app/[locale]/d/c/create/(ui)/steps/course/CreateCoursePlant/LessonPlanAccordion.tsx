import { useUpdateLesson } from '@/entities/lesson/model/lesson.queries'
import DNDIcon from '@/shared/assets/icons/DNDIcon'
import '@/shared/ui/Accordion/Accordion.scss'
import Button from '@/shared/ui/Button/Button'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import EditCourseModal from './CreateCourseCard/EditCourseModal'

const LessonPlanAccordion = ({ lessonsAllData, t, parentPrefix = '' }) => {
	const [lessons, setLessons] = useState(lessonsAllData)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedLesson, setSelectedLesson] = useState(null)
	const [openLessonId, setOpenLessonId] = useState(null)
	const { updateLesson } = useUpdateLesson()

	const handleEditClick = lesson => {
		setSelectedLesson(lesson)
		setIsModalOpen(true)
	}

	const handleSave = async updatedLesson => {
		await updateLesson({
			variables: {
				lessonId: updatedLesson.id,
				updateLessonInput: {
					name: updatedLesson.name,
					description: updatedLesson.description
				}
			}
		})
		setIsModalOpen(false)
	}

	const toggleLesson = lessonId => {
		setOpenLessonId(openLessonId === lessonId ? null : lessonId)
	}

	return (
		<div className='w-full gap-5'>
			{lessons.map((lesson, index) => (
				<div key={lesson.id} className='flex gap-5 items-center w-full mt-4'>
					<DNDIcon />
					<Button
						color='primary'
						size='auto'
						className='w-full flex justify-between items-center rounded-3xl h-[70px] max-md:h-[50px]'
						onClick={() => toggleLesson(lesson.id)}
						endContent={<ArrowRight />}
					>
						<div className='flex-1'>
							<div className='flex justify-between items-center'>
								<div className='flex gap-4 items-center'>
									<h2 className='text-sm text-yellow-5'>{t('lesson')}</h2>
									<h1>{`${parentPrefix}${index + 1}. ${lesson.name}`}</h1>
								</div>
							</div>
						</div>
					</Button>
					<Button
						className='rounded-3xl max-md:w-[50px] max-md:h-[50px] aspect-square'
						isIconOnly
						size='mdIcon'
						variant='square'
						color='gray'
						onClick={e => {
							e.stopPropagation()
							handleEditClick(lesson)
						}}
						startContent={
							<HiPencil color='var(--color-accent)' fontSize={28} />
						}
					/>
				</div>
			))}

			{selectedLesson && (
				<EditCourseModal
					t={t}
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					data={selectedLesson}
					onSave={handleSave}
					type='lesson'
				/>
			)}
		</div>
	)
}

export default LessonPlanAccordion
