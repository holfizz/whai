import Button from '@/shared/ui/Button/Button'
import CourseCard from '@/shared/ui/CourseCard/CourseCard'

const LessonPlan = ({ lessonsAllData, t }) => {
	return (
		<>
			{lessonsAllData &&
				lessonsAllData.map(lesson => (
					<CourseCard
						key={lesson.id}
						course={lesson}
						button={<Button className='w-full'>{t('Generate lesson')}</Button>}
					/>
				))}
		</>
	)
}

export default LessonPlan
