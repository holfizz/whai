import { useUpdateTopic } from '@/entities/topic/model/topic.queries'
import { useEffect, useState } from 'react'
import AddButton from './CreateCourseCard/AddButton'
import CreateCourseCard from './CreateCourseCard/CreateCourseCard'

const TopicPlan = ({ topicsAllData, handleTopicClick, t }) => {
	const [topics, setTopics] = useState(topicsAllData)
	const { updateTopic, updatedTopicData } = useUpdateTopic()

	const handleCourseDataChange = updatedTopic => {
		updateTopic({
			variables: {
				topicId: updatedTopic.id,
				updateTopicInput: {
					name: updatedTopic.name,
					description: updatedTopic.description
				}
			}
		})
	}

	useEffect(() => {
		if (updatedTopicData) {
			setTopics(prevTopics =>
				prevTopics.map(topic =>
					topic.id === updatedTopicData.id ? updatedTopicData : topic
				)
			)
		}
	}, [updatedTopicData])

	return (
		<>
			{topics.map(topic => (
				<CreateCourseCard
					t={t}
					type='topic'
					handleClick={() => handleTopicClick(topic)}
					key={topic.id}
					className='w-full'
					data={topic}
					buttonText={t('View topics')}
					onCourseDataChange={handleCourseDataChange}
				/>
			))}
			{topics.length > 0 && <AddButton />}
		</>
	)
}

export default TopicPlan
