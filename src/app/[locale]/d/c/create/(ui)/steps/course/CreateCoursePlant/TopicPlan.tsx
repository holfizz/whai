import CreateCourseCard from './CreateCourseCard/CreateCourseCard'

const TopicPlan = ({ topicsAllData, handleTopicClick, t }) => {
	return (
		<>
			{topicsAllData.map(topic => (
				<CreateCourseCard
					t={t}
					type='topic'
					handleClick={() => handleTopicClick(topic)}
					key={topic.id}
					className='w-full'
					data={topic}
					buttonText={t('View topics')}
				/>
			))}
		</>
	)
}

export default TopicPlan
