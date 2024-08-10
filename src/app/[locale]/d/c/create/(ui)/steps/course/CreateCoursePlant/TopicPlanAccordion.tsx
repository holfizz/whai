import { useUpdateTopic } from '@/entities/topic/model/topic.queries'
import DNDIcon from '@/shared/assets/icons/DNDIcon'
import { Accordion, AccordionItem } from '@/shared/ui/Accordion/MyAccordion'
import Button from '@/shared/ui/Button/Button'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import EditCourseModal from './CreateCourseCard/EditCourseModal'
import SubtopicPlanAccordion from './SubtopicPlanAccordion'

const TopicPlanAccordion = ({ topicsAllData, t }) => {
	const [topics, setTopics] = useState(topicsAllData)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedTopic, setSelectedTopic] = useState(null)
	const { updateTopic } = useUpdateTopic()

	const handleEditClick = topic => {
		setSelectedTopic(topic)
		setIsModalOpen(true)
	}

	const handleSave = updatedTopic => {
		updateTopic({
			variables: {
				topicId: updatedTopic.id,
				updateTopicInput: {
					name: updatedTopic.name,
					description: updatedTopic.description
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

		const reorderedTopics = Array.from(topics)
		const [movedTopic] = reorderedTopics.splice(source.index, 1)
		reorderedTopics.splice(destination.index, 0, movedTopic)

		setTopics(reorderedTopics)
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='droppable-topics'>
				{provided => (
					<div
						className='w-full'
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<Accordion>
							{topics.map((topic, index) => (
								<Draggable
									key={topic.id}
									draggableId={`topic-${topic.id}`}
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
												title={
													<div className='flex items-center justify-between gap-3'>
														<div className='w-full px-4 flex justify-between items-center h-[70px]'>
															<div className='flex gap-4 items-center'>
																<h2 className='text-sm text-yellow-5'>
																	{t('module')}
																</h2>
																<h1>
																	{index + 1}. {topic.name}
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
														onClick={() => handleEditClick(topic)}
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
																<p className='text-sm'>{topic.description}</p>
															</div>
															<SubtopicPlanAccordion
																subtopicsAllData={topic.subtopics}
																t={t}
																parentPrefix={`${index + 1}.`}
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
						{selectedTopic && (
							<EditCourseModal
								t={t}
								isOpen={isModalOpen}
								onClose={() => setIsModalOpen(false)}
								data={selectedTopic}
								onSave={handleSave}
								type='topic'
							/>
						)}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default TopicPlanAccordion
