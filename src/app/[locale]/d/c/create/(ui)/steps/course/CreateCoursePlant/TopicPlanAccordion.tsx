import { useUpdateTopic } from '@/entities/topic/model/topic.queries'
import ArrowDown from '@/shared/assets/icons/ArrowDown'
import DNDIcon from '@/shared/assets/icons/DNDIcon'
import Button from '@/shared/ui/Button/Button'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import useUnifiedStore from '../../../../(model)/unified.state'
import cls from './Accordion.module.scss'
import EditCourseModal from './CreateCourseCard/EditCourseModal'
import SubtopicPlanAccordion from './SubtopicPlanAccordion'

const TopicPlanAccordion = ({ topicsAllData, t }) => {
	const [topics, setTopics] = useState(topicsAllData)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedTopic, setSelectedTopic] = useState(null)
	const [selectedKeys, setSelectedKeys] = useState(new Set()) // Track selected keys
	const { updateTopic } = useUpdateTopic()
	const { setCoursePlanStateData, coursePlanStateData } = useUnifiedStore()

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

	const handleSelectionChange = keys => {
		setSelectedKeys(keys)
	}

	return (
		<Accordion
			fullWidth
			selectionMode='multiple'
			variant='light'
			className={cls.Accordion}
			showDivider={false}
			selectedKeys={selectedKeys}
			onSelectionChange={handleSelectionChange}
		>
			{topics.map((topic, index) => (
				<AccordionItem
					hideIndicator
					key={topic.id}
					title={
						<div className='flex items-center justify-between gap-3'>
							<div className='flex gap-5 items-center w-full'>
								<DNDIcon />
								<div className='w-full px-4 flex justify-between items-center h-[70px] bg-decor-3  rounded-3xl'>
									<div className='flex gap-4 items-center'>
										<h2 className='text-sm text-yellow-5'>{t('module')}</h2>
										<h1>
											{index + 1}. {topic.name}
										</h1>
									</div>
									<ArrowDown
										className={`${
											selectedKeys.has(topic.id) ? 'rotate-180' : ''
										} transition-transform duration-300`}
									/>
								</div>
							</div>
							<Button
								className={'rounded-3xl'}
								isIconOnly
								size='mdIcon'
								variant='square'
								color='gray'
								onClick={() => handleEditClick(topic)}
								startContent={
									<HiPencil color='var(--color-decor-2)' fontSize={28} />
								}
							/>
						</div>
					}
				>
					<div className='w-full flex flex-col items-end'>
						<div className='flex flex-col w-[97%] items-end justify-center'>
							<div className='flex flex-col items-start justify-center w-full'>
								<div className='flex flex-col'>
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
		</Accordion>
	)
}

export default TopicPlanAccordion
