import { useUpdateLesson } from '@/entities/lesson/model/lesson.queries'
import DNDIcon from '@/shared/assets/icons/DNDIcon'
import Button from '@/shared/ui/Button/Button'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
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

	const onDragEnd = result => {
		const { source, destination } = result

		if (
			!destination ||
			(source.index === destination.index &&
				source.droppableId === destination.droppableId)
		) {
			return
		}

		const reorderedLessons = Array.from(lessons)
		const [movedLesson] = reorderedLessons.splice(source.index, 1)
		reorderedLessons.splice(destination.index, 0, movedLesson)

		setLessons(reorderedLessons)
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='droppable-lessons'>
				{provided => (
					<div
						className='w-full gap-5'
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{lessons.map((lesson, index) => (
							<Draggable key={lesson.id} draggableId={lesson.id} index={index}>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className='flex gap-5 items-center w-full mt-4'
									>
										<DNDIcon />
										<Button
											color='primary'
											size='auto'
											className='w-full flex justify-between items-center rounded-3xl h-[70px]'
											onClick={() => toggleLesson(lesson.id)}
											endContent={<ArrowRight />}
										>
											<div className='flex-1'>
												<div className='flex justify-between items-center'>
													<div className='flex gap-4 items-center'>
														<h2 className='text-sm text-yellow-5'>
															{t('lesson')}
														</h2>
														<h1>{`${parentPrefix}${index + 1}. ${
															lesson.name
														}`}</h1>
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
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
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
		</DragDropContext>
	)
}

export default LessonPlanAccordion
