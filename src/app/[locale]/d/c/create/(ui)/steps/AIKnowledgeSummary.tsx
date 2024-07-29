import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory/'
import { useGenerateKnowledgeSum } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz'
import { useEffect, useState } from 'react'
import useCourseStore from '../../(model)/create-page.store'

const AIKnowledgeSummary = () => {
	const { quizResultId } = useQuizStore()
	const { courseId } = useCourseStore()
	const {
		generateKnowledgeSum,
		knowledgeSumData,
		knowledgeSumError,
		knowledgeSumLoading
	} = useGenerateKnowledgeSum()
	const [summaryData, setSummaryData] = useState(null)
	const { courseAIHistory, errorFetchingHistory, loadingFetchingHistory } =
		useGetCourseAIHistoryByCourseId(courseId)
	useEffect(() => {
		if (quizResultId && courseAIHistory.id) {
			generateKnowledgeSum({
				variables: {
					dto: {
						conversationId: courseAIHistory.id,
						quizResultId,
						courseId: courseId
					}
				}
			})
				.then(response => setSummaryData(response.data.generateKnowledgeSum))
				.catch(err => console.error(err))
		}
	}, [quizResultId, generateKnowledgeSum, courseAIHistory?.id, courseId])

	if (knowledgeSumLoading) return <p>Loading...</p>
	if (knowledgeSumData) return <p>Error: {knowledgeSumError.message}</p>

	return (
		<div>
			{summaryData && (
				<>
					<h2>Knowledge Summary</h2>
					<p>{summaryData.summary}</p>
					<h3>Strong Points</h3>
					<ul>
						{summaryData.strongPoints.map((point, index) => (
							<li key={index}>{point}</li>
						))}
					</ul>
					<h3>Weak Points</h3>
					<ul>
						{summaryData.weakPoints.map((point, index) => (
							<li key={index}>{point}</li>
						))}
					</ul>
					<h3>Recommendations</h3>
					<ul>
						{summaryData.recommendations.map((rec, index) => (
							<li key={index}>{rec}</li>
						))}
					</ul>
				</>
			)}
		</div>
	)
}

export default AIKnowledgeSummary
