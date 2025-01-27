import { useUpdateLesson } from '@/entities/lesson/model/lesson.queries'
import { ILessonPlan } from '@/entities/plan/model/plan.types'
import PencilIcon from '@/shared/assets/icons/Pencil'
import '@/shared/ui/Accordion/Accordion.scss'
import Button from '@/shared/ui/Button/Button'

import ArrowRight from '@/shared/assets/icons/ArrowRight'
import PlusIcon from '@/shared/assets/icons/Plus'
import { useState } from 'react'

import useUnifiedStore from '../../../../(model)/unified.state'
import EditCourseModal from './CreateCourseCard/EditCourseModal'
import GenerateBlockModal from './GenerateBlockModal'

const LessonPlanAccordion = ({
	lessonsAllData,
	t,
	parentPrefix = ''
}: {
	lessonsAllData?: ILessonPlan[]
	t: any
	parentPrefix: string
}) => {
	const { coursePlanStateData } = useUnifiedStore()
	const [lessons, setLessons] = useState<any[]>(lessonsAllData)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedLesson, setSelectedLesson] = useState(null)
	const [openLessonId, setOpenLessonId] = useState(null)
	const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false) // Add state for GenerateBlockModal
	const { updateLesson } = useUpdateLesson()

	const handleEditClick = lesson => {
		setSelectedLesson(lesson)
		setIsModalOpen(true)
	}

	const handleSave = async updatedLesson => {
		await updateLesson({
			variables: {
				updateLessonInput: {
					id: updatedLesson.id,
					name: updatedLesson.name,
					description: updatedLesson.description
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

	const toggleLesson = lessonId => {
		setOpenLessonId(openLessonId === lessonId ? null : lessonId)
	}

	return (
		<div className='w-full gap-5'>
			{lessons.map((lesson, index) => (
				<div key={lesson.id} className='flex gap-5 items-start w-full mt-4'>
					<div className='w-full flex flex-col items-start gap-5'>
						<Button
							color='primary'
							size='auto'
							className='w-full  flex justify-between items-center rounded-3xl h-[70px] max-w-full max-md:h-[50px]'
							onClick={() => toggleLesson(lesson.id)}
							endContent={<ArrowRight />}
						>
							<div className='flex-1'>
								<div className='flex justify-between items-center'>
									<div className='flex gap-4 items-center'>
										<h2 className='text-sm text-yellow-5'>{t('lesson')}</h2>
										<h1 className='break-words max-md:w-[250px] max-w-full text-ellipsis overflow-hidden text-start'>{`${parentPrefix}${
											index + 1
										}. ${lesson.name}`}</h1>
									</div>
								</div>
							</div>
						</Button>

						{/* Кнопка добавления нового урока */}
						{index === lessons.length - 1 && (
							<Button
								className='rounded-3xl h-[70px] max-md:!min-h-[50px] max-md:!h-[50px]'
								isIconOnly
								size='full'
								color='gray'
								startContent={<PlusIcon />}
								onClick={handleGenerate} // Handle the generate button click
							/>
						)}
					</div>
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
							<PencilIcon color='var(--color-accent)' fontSize={28} />
						}
					/>
				</div>
			))}
			{lessons.length === 0 && (
				<Button
					className='rounded-3xl h-[70px]'
					isIconOnly
					size='full'
					color='gray'
					startContent={<PlusIcon />}
					onClick={handleGenerate}
				/>
			)}
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

			<GenerateBlockModal
				type='lesson'
				courseId={coursePlanStateData}
				subtopicId={lessonsAllData[0]?.subtopicId}
				isOpen={isGenerateModalOpen}
				onClose={() => setIsGenerateModalOpen(false)}
				onSave={handleBlockSave}
			/>
		</div>
	)
}

export default LessonPlanAccordion
