import { useUpdateSubtopic } from '@/entities/subtopic/model/subtopic.queries'
import DNDIcon from '@/shared/assets/icons/DNDIcon'
import { Accordion, AccordionItem } from '@/shared/ui/Accordion/MyAccordion'
import Button from '@/shared/ui/Button/Button'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import EditCourseModal from './CreateCourseCard/EditCourseModal'
import LessonPlanAccordion from './LessonPlanAccordion'

const SubtopicPlanAccordion = ({ subtopicsAllData, t, parentPrefix = '' }) => {
	const [subtopics, setSubtopics] = useState(subtopicsAllData)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedSubtopic, setSelectedSubtopic] = useState(null)
	const { updateSubtopic } = useUpdateSubtopic()

	const handleEditClick = subtopic => {
		setSelectedSubtopic(subtopic)
		setIsModalOpen(true)
	}

	const handleSave = updatedSubtopic => {
		updateSubtopic({
			variables: {
				subtopicId: updatedSubtopic.id,
				updateSubtopicInput: {
					name: updatedSubtopic.name,
					description: updatedSubtopic.description
				}
			}
		})
		setIsModalOpen(false)
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

		const reorderedSubtopics = Array.from(subtopics)
		const [movedSubtopic] = reorderedSubtopics.splice(source.index, 1)
		reorderedSubtopics.splice(destination.index, 0, movedSubtopic)

		setSubtopics(reorderedSubtopics)
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='droppable-subtopics'>
				{provided => (
					<div
						className='w-full'
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<Accordion>
							{subtopics.map((subtopic, index) => (
								<Draggable
									key={subtopic.id}
									draggableId={`subtopic-${subtopic.id}`}
									index={index}
								>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className='flex w-full items-start gap-5 justify-center'
										>
											<AccordionItem
												className={'ml-6'}
												title={
													<div className='flex items-center justify-between gap-3'>
														<div className='w-full px-4 flex justify-between items-center h-[70px]'>
															<div className='flex gap-4 items-center'>
																<h2 className='text-sm text-yellow-5'>
																	{t('topic')}
																</h2>
																<h1>
																	{parentPrefix}
																	{index + 1}. {subtopic.name}
																</h1>
															</div>
														</div>
													</div>
												}
												startContent={
													<div className='h-[70px] flex items-center justify-center'>
														<DNDIcon />
													</div>
												}
												endContent={
													<Button
														className='rounded-3xl'
														isIconOnly
														size='mdIcon'
														variant='square'
														color='gray'
														onClick={() => handleEditClick(subtopic)}
														startContent={
															<HiPencil
																color='var(--color-decor-2)'
																fontSize={28}
															/>
														}
													/>
												}
											>
												<div className='w-full flex flex-col items-end'>
													<div className='flex flex-col w-full items-end justify-center'>
														<div className='flex flex-col items-start justify-center w-full gap-5'>
															<div className='flex flex-col ml-8 mt-3'>
																<h3 className='text-sm text-gray-3'>
																	{t('description')}
																</h3>
																<p className='text-sm'>
																	{subtopic.description}
																</p>
															</div>
															<LessonPlanAccordion
																parentPrefix={`${parentPrefix}${index + 1}.`}
																lessonsAllData={subtopic.lessons}
																t={t}
															/>
														</div>
													</div>
												</div>
											</AccordionItem>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</Accordion>
						{selectedSubtopic && (
							<EditCourseModal
								t={t}
								isOpen={isModalOpen}
								onClose={() => setIsModalOpen(false)}
								data={selectedSubtopic}
								onSave={handleSave}
								type='subtopic'
							/>
						)}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default SubtopicPlanAccordion
