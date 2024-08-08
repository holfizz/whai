import { useUpdateSubtopic } from '@/entities/subtopic/model/subtopic.queries'
import { useEffect, useState } from 'react'
import CreateCourseCard from './CreateCourseCard/CreateCourseCard'

const SubtopicPlan = ({ subtopicsAllData, handleSubtopicClick, t }) => {
	const [subtopics, setSubtopics] = useState(subtopicsAllData)
	const {
		updateSubtopic,
		dataSubtopicUpdate,
		loadingSubtopicUpdate,
		errorSubtopicUpdate
	} = useUpdateSubtopic()

	const handleCourseDataChange = updatedSubtopic => {
		updateSubtopic({
			variables: { updateSubtopicInput: updatedSubtopic }
		})
	}

	// Update the local state when the mutation completes
	useEffect(() => {
		if (dataSubtopicUpdate) {
			setSubtopics(prevSubtopics =>
				prevSubtopics.map(subtopic =>
					subtopic.id === dataSubtopicUpdate.id ? dataSubtopicUpdate : subtopic
				)
			)
		}
	}, [dataSubtopicUpdate])

	return (
		<>
			{subtopics.map(subtopic => (
				<CreateCourseCard
					t={t}
					type='subtopic'
					handleClick={() => handleSubtopicClick(subtopic)}
					className='w-full'
					key={subtopic.id}
					data={subtopic}
					buttonText={t('View lessons')}
					onCourseDataChange={handleCourseDataChange} // Pass the handler
				/>
			))}
		</>
	)
}

export default SubtopicPlan
