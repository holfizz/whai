import Button from '@/shared/ui/Button/Button'
import CourseCard from '@/shared/ui/CourseCard/CourseCard'

const TopicPlan = ({ topicsAllData, handleTopicClick, t }) => {
	return (
		<>
			{topicsAllData &&
				topicsAllData.map(topic => (
					<CourseCard
						key={topic.id}
						course={topic}
						button={
							<Button
								className='w-full'
								onClick={() => handleTopicClick(topic.id)}
							>
								{t('Generate topic')}
							</Button>
						}
					/>
				))}
		</>
	)
}

export default TopicPlan
