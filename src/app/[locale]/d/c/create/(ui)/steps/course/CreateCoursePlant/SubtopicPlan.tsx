import Button from '@/shared/ui/Button/Button'
import CourseCard from '@/shared/ui/CourseCard/CourseCard'

const SubtopicPlan = ({ subtopicsAllData, handleSubtopicClick, t }) => {
	return (
		<>
			{subtopicsAllData &&
				subtopicsAllData.map(subtopic => (
					<CourseCard
						key={subtopic.id}
						course={subtopic}
						button={
							<Button
								className='w-full'
								onClick={() => handleSubtopicClick(subtopic.id)}
							>
								{t('Generate subtopic')}
							</Button>
						}
					/>
				))}
		</>
	)
}

export default SubtopicPlan
