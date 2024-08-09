import { useUpdateSubtopic } from '@/entities/subtopic/model/subtopic.queries'
import ArrowDown from '@/shared/assets/icons/ArrowDown'
import DNDIcon from '@/shared/assets/icons/DNDIcon'
import Button from '@/shared/ui/Button/Button'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import useUnifiedStore from '../../../../(model)/unified.state'
import cls from './Accordion.module.scss'
import EditCourseModal from './CreateCourseCard/EditCourseModal'
import LessonPlanAccordion from './LessonPlanAccordion'
const SubtopicPlanAccordion = ({ subtopicsAllData, t, parentPrefix = '' }) => {
	const [subtopics, setSubtopics] = useState(subtopicsAllData)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedSubtopic, setSelectedSubtopic] = useState(null)
	const [selectedKeys, setSelectedKeys] = useState<any>(new Set())
	const { updateSubtopic } = useUpdateSubtopic()
	const { setCoursePlanStateData, coursePlanStateData } = useUnifiedStore()

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

	const handleSelectionChange = keys => {
		setSelectedKeys(keys)
	}

	return (
		<>
			<Accordion
				fullWidth
				selectionMode='multiple'
				variant='light'
				className={cls.Accordion}
				showDivider={false}
				selectedKeys={selectedKeys}
				onSelectionChange={handleSelectionChange}
			>
				{subtopics.map((subtopic, index) => (
					<AccordionItem
						key={subtopic.id}
						hideIndicator
						title={
							<div className='flex items-center justify-between gap-3'>
								<div className='flex gap-5 items-center w-full'>
									<DNDIcon />
									<div className='w-full px-4 flex justify-between items-center h-[70px] bg-decor-3 rounded-3xl'>
										<div className='flex gap-4 items-center'>
											<h2 className='text-sm text-yellow-5'>{t('topic')}</h2>
											<h1>
												{parentPrefix}
												{index + 1}. {subtopic.name}
											</h1>
										</div>
										<ArrowDown
											className={`${
												selectedKeys.has(subtopic.id) ? 'rotate-180' : ''
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
									onClick={() => handleEditClick(subtopic)}
									startContent={
										<HiPencil color='var(--color-decor-2)' fontSize={28} />
									}
								/>
							</div>
						}
					>
						<div className='w-full flex flex-col items-end'>
							<div className='flex flex-col w-full items-end justify-center'>
								<div className='flex flex-col items-start justify-center w-full gap-5'>
									<div className='flex flex-col'>
										<h3 className='text-sm text-gray-3'>{t('description')}</h3>
										<p className='text-sm'>{subtopic.description}</p>
									</div>
									<LessonPlanAccordion
										parentPrefix={`
									${parentPrefix}${index + 1}.`}
										lessonsAllData={subtopic.lessons}
										t={t}
									/>
								</div>
							</div>
						</div>
					</AccordionItem>
				))}

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
			</Accordion>
		</>
	)
}

export default SubtopicPlanAccordion
