import { ISubtopicPlan } from '@/entities/plan/model/plan.types'
import { useUpdateSubtopic } from '@/entities/subtopic/model/subtopic.queries'
import { Accordion, AccordionItem } from '@/shared/ui/Accordion/MyAccordion'
import Button from '@/shared/ui/Button/Button'
import { useState } from 'react'

import PencilIcon from '@/shared/assets/icons/Pencil'

import PlusIcon from '@/shared/assets/icons/Plus'
import EditCourseModal from './CreateCourseCard/EditCourseModal'
import GenerateBlockModal from './GenerateBlockModal' // Import GenerateBlockModal
import LessonPlanAccordion from './LessonPlanAccordion'

const SubtopicPlanAccordion = ({
	subtopicsAllData,
	t,
	parentPrefix = ''
}: {
	subtopicsAllData: ISubtopicPlan[]
	t: any
	parentPrefix: string
}) => {
	const [subtopics, setSubtopics] = useState(subtopicsAllData)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedSubtopic, setSelectedSubtopic] = useState(null)
	const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)
	const { updateSubtopic } = useUpdateSubtopic()

	const handleEditClick = subtopic => {
		setSelectedSubtopic(subtopic)
		setIsModalOpen(true)
	}

	const handleSave = async updatedSubtopic => {
		await updateSubtopic({
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

	const handleGenerate = () => {
		setIsGenerateModalOpen(true)
	}

	const handleBlockSave = newBlocks => {
		console.log('Newly generated blocks:', newBlocks)
		setIsGenerateModalOpen(false)
	}

	return (
		<div className='w-full'>
			<Accordion>
				{subtopics.map((subtopic, index) => (
					<AccordionItem
						key={subtopic.id}
						isLast={index === subtopics.length - 1}
						title={
							<div className='flex items-center justify-between gap-3'>
								<div className='w-full px-4 flex justify-between items-center h-[70px]'>
									<div className='flex gap-4 items-center'>
										<h2 className='text-sm text-yellow-5'>{t('topic')}</h2>
										<h1 className='line-clamp-2'>
											{parentPrefix}
											{index + 1}. {subtopic.name}
										</h1>
									</div>
								</div>
							</div>
						}
						editButton={
							<Button
								className='rounded-3xl max-md:w-[50px] max-md:h-[50px] aspect-square'
								isIconOnly
								size='mdIcon'
								variant='square'
								color='gray'
								onClick={() => handleEditClick(subtopic)}
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
										<p className='text-sm'>{subtopic.description}</p>
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
				))}
			</Accordion>
			{subtopics.length === 0 && (
				<Button
					className='rounded-3xl h-[70px] max-md:!min-h-[50px]'
					isIconOnly
					size='full'
					color='gray'
					startContent={<PlusIcon />}
					onClick={handleGenerate} // Handle the generate button click
				/>
			)}
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

			<GenerateBlockModal
				type='subtopic'
				topicId={subtopicsAllData[0]?.topicId}
				isOpen={isGenerateModalOpen}
				onClose={() => setIsGenerateModalOpen(false)}
				onSave={handleBlockSave}
			/>
		</div>
	)
}

export default SubtopicPlanAccordion
