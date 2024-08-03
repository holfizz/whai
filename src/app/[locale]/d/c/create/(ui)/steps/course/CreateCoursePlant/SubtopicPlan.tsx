import CreateCourseCard from './CreateCourseCard/CreateCourseCard'

const SubtopicPlan = ({ subtopicsAllData, handleSubtopicClick, t }) => {
	return (
		<>
			{subtopicsAllData.map(subtopic => (
				<CreateCourseCard
					t={t}
					type='subtopic'
					handleClick={() => handleSubtopicClick(subtopic)}
					className='w-full'
					key={subtopic.id}
					data={subtopic}
					buttonText={t('View lessons')}
				/>
			))}
		</>
	)
}

export default SubtopicPlan
