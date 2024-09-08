import { ITopicPlan } from '@/entities/plan/model/plan.types'
import { useUpdateTopic } from '@/entities/topic/model/topic.queries'
import PencilIcon from '@/shared/assets/icons/Pencil'
import PlusIcon from '@/shared/assets/icons/Plus'
import '@/shared/ui/Accordion/Accordion.scss'
import { Accordion, AccordionItem } from '@/shared/ui/Accordion/MyAccordion'
import Button from '@/shared/ui/Button/Button'
import { useEffect, useRef, useState } from 'react'
import EditCourseModal from './CreateCourseCard/EditCourseModal'
import GenerateBlockModal from './GenerateBlockModal' // Ensure this import is correct
import SubtopicPlanAccordion from './SubtopicPlanAccordion'

const TopicPlanAccordion = ({
	topicsAllData,
	t
}: {
	topicsAllData: ITopicPlan[]
	t: any
}) => {
	const [topics, setTopics] = useState(topicsAllData)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)
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
		setIsEditModalOpen(true)
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
		setIsEditModalOpen(false)
	}

	const handleGenerate = () => {
		setIsGenerateModalOpen(true)
	}

	const handleBlockSave = newBlocks => {
		console.log('Newly generated blocks:', newBlocks)
		setIsGenerateModalOpen(false)
	}

	return (
		<div className='w-full !max-w-full'>
			<Accordion>
				{topics.map((topic, index) => (
					<AccordionItem
						key={topic.id}
						isLast={index === topics.length - 1}
						title={
							<div className='flex items-center justify-between gap-3'>
								<div className='w-full px-4 flex justify-between items-center h-[70px] max-md:h-min'>
									<div className='flex gap-4 items-center'>
										<h2 className='text-sm text-yellow-5'>{t('module')}</h2>
										<h1 className='line-clamp-2'>
											{index + 1}. {topic.name}
										</h1>
									</div>
								</div>
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
									<PencilIcon color='var(--color-accent)' fontSize={28} />
								}
							/>
						}
						addButton={
							<Button
								className='rounded-3xl h-[70px] max-md:!min-h-[50px] max-md:!h-[50px]'
								isIconOnly
								size='full'
								color='gray'
								startContent={<PlusIcon />}
								onClick={handleGenerate}
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
					isOpen={isEditModalOpen}
					onClose={() => setIsEditModalOpen(false)}
					data={selectedTopic}
					onSave={handleSave}
					type='topic'
				/>
			)}

			<GenerateBlockModal
				type='topic'
				isOpen={isGenerateModalOpen}
				onClose={() => setIsGenerateModalOpen(false)}
				onSave={handleBlockSave}
				courseId={topicsAllData[0]?.courseId}
			/>
		</div>
	)
}

export default TopicPlanAccordion
