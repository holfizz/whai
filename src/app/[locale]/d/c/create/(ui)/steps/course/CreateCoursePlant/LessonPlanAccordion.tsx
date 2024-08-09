import { useUpdateLesson } from '@/entities/lesson/model/lesson.queries'
import DNDIcon from '@/shared/assets/icons/DNDIcon'
import Button from '@/shared/ui/Button/Button'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import useUnifiedStore from '../../../../(model)/unified.state'
import EditCourseModal from './CreateCourseCard/EditCourseModal'

const LessonPlanAccordion = ({ lessonsAllData, t, parentPrefix = '' }) => {
	const [lessons, setLessons] = useState(lessonsAllData)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedLesson, setSelectedLesson] = useState(null)
	const [openLessonId, setOpenLessonId] = useState(null) // Track open lesson
	const { updateLesson } = useUpdateLesson()
	const { setCoursePlanStateData, coursePlanStateData } = useUnifiedStore()

	const handleEditClick = lesson => {
		setSelectedLesson(lesson)
		setIsModalOpen(true)
	}

	const handleSave = updatedLesson => {
		updateLesson({
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
		<>
			{lessons.map((lesson, index) => (
				<div key={lesson.id} className='flex gap-5 items-center w-full'>
					<DNDIcon />
					<Button
						color='primary'
						size='auto'
						className='w-full flex justify-between items-center rounded-3xl h-[70px]'
						onClick={() => toggleLesson(lesson.id)}
						endContent={
							<ArrowRight
								className={`transition-transform duration-300 ${
									openLessonId === lesson.id ? 'rotate-90' : ''
								}`}
							/>
						}
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
						className='rounded-3xl'
						isIconOnly
						size='mdIcon'
						variant='square'
						color='gray'
						onClick={e => {
							e.stopPropagation()
							handleEditClick(lesson)
						}}
						startContent={
							<HiPencil color='var(--color-decor-2)' fontSize={28} />
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
		</>
	)
}

export default LessonPlanAccordion
