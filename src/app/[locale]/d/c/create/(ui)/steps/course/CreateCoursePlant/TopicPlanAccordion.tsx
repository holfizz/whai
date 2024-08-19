import { useUpdateTopic } from '@/entities/topic/model/topic.queries'
import DNDIcon from '@/shared/assets/icons/DNDIcon'
import '@/shared/ui/Accordion/Accordion.scss'
import { Accordion, AccordionItem } from '@/shared/ui/Accordion/MyAccordion'
import Button from '@/shared/ui/Button/Button'
import { useEffect, useRef, useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import EditCourseModal from './CreateCourseCard/EditCourseModal'
import SubtopicPlanAccordion from './SubtopicPlanAccordion'

const TopicPlanAccordion = ({ topicsAllData, t }) => {
	const [topics, setTopics] = useState(topicsAllData)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedTopic, setSelectedTopic] = useState(null)
	const { updateTopic } = useUpdateTopic()
	const [accordionWidth, setAccordionWidth] = useState('auto')

	const accordionRef = useRef(null)

	useEffect(() => {
		if (accordionRef.current) {
			setAccordionWidth(accordionRef.current.offsetWidth)
		}
	}, [topics])

	const handleEditClick = topic => {
		setSelectedTopic(topic)
		setIsModalOpen(true)
	}

	const handleSave = async updatedTopic => {
		await updateTopic({
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

	return (
		<div className='w-full'>
			<Accordion>
				{topics.map((topic, index) => (
					<AccordionItem
						key={topic.id}
						className={'ml-6'}
						title={
							<div className='flex items-center justify-between gap-3'>
								<div className='w-full px-4 flex justify-between items-center h-[70px] max-md:h-min'>
									<div className='flex gap-4 items-center'>
										<h2 className='text-sm text-yellow-5'>{t('module')}</h2>
										<h1>
											{index + 1}. {topic.name}
										</h1>
									</div>
								</div>
							</div>
						}
						startContent={
							<div className='h-[70px] flex items-center justify-center max-md:h-[50px]'>
								<DNDIcon />
							</div>
						}
						endContent={
							<Button
								className='rounded-3xl max-md:w-[50px] max-md:h-[50px] aspect-square'
								isIconOnly
								size='mdIcon'
								variant='square'
								color='gray'
								onClick={() => handleEditClick(topic)}
								startContent={
									<HiPencil color='var(--color-accent)' fontSize={28} />
								}
							/>
						}
					>
						<div className='w-full flex flex-col items-end'>
							<div className='flex flex-col w-full items-end justify-center'>
								<div className='flex flex-col items-start justify-center w-full gap-5'>
									<div className='flex flex-col ml-8 mt-3'>
										<h3 className='text-sm text-gray-3'>{t('description')}</h3>
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
				))}
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
	)
}

export default TopicPlanAccordion
