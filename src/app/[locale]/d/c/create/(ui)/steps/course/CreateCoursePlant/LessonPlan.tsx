import CreateCourseCard from './CreateCourseCard/CreateCourseCard'

const LessonPlan = ({ lessonsAllData, t }) => {
	return (
		<>
			{lessonsAllData.map(lesson => (
				<CreateCourseCard
					t={t}
					type='lesson'
					key={lesson.id}
					data={lesson}
					buttonText={t('Generate lesson')}
				/>
			))}
		</>
	)
}

export default LessonPlan
