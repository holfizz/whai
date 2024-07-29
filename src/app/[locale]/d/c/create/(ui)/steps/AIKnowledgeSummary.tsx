import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory/'
import { useGenerateKnowledgeSum } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import useCourseStore from '../../(model)/create-page.store'

const AIKnowledgeSummary = () => {
	const t = useTranslations('CreateCourse')
	const { quizResultId } = useQuizStore()
	const { courseId, prevStep, summaryData, setSummaryData } = useCourseStore()
	const {
		generateKnowledgeSum,
		knowledgeSumData,
		knowledgeSumError,
		knowledgeSumLoading
	} = useGenerateKnowledgeSum()
	const { courseAIHistory, errorFetchingHistory, loadingFetchingHistory } =
		useGetCourseAIHistoryByCourseId(courseId)

	useEffect(() => {
		if (!summaryData && quizResultId && courseAIHistory?.id) {
			generateKnowledgeSum({
				variables: {
					dto: {
						conversationId: courseAIHistory.id,
						quizResultId,
						courseId: courseId
					}
				}
			})
				.then(response => {
					const data = response.data.generateKnowledgeSum
					setSummaryData(data)
				})
				.catch(err => console.error(err))
		}
	}, [
		quizResultId,
		generateKnowledgeSum,
		courseAIHistory?.id,
		courseId,
		summaryData,
		setSummaryData
	])

	if (knowledgeSumLoading) return <p>Loading...</p>
	if (knowledgeSumError) return <p>Error: {knowledgeSumError?.message}</p>

	return (
		<DashboardLayout>
			<div>
				{summaryData && (
					<>
						<h2>Knowledge Summary</h2>
						<p>{summaryData.summary}</p>

						<h3>Details</h3>
						<Table aria-label='Knowledge Summary Details'>
							<TableHeader>
								<TableColumn>Type</TableColumn>
								<TableColumn>Details</TableColumn>
							</TableHeader>
							<TableBody>
								<TableRow key='1'>
									<TableCell>Strong Points</TableCell>
									<TableCell>
										<ul>
											{summaryData.strongPoints.map((point, index) => (
												<li key={index}>{point}</li>
											))}
										</ul>
									</TableCell>
								</TableRow>
								<TableRow key='2'>
									<TableCell>Weak Points</TableCell>
									<TableCell>
										<ul>
											{summaryData.weakPoints.map((point, index) => (
												<li key={index}>{point}</li>
											))}
										</ul>
									</TableCell>
								</TableRow>
								<TableRow key='3'>
									<TableCell>Recommendations</TableCell>
									<TableCell>
										<ul>
											{summaryData.recommendations.map((rec, index) => (
												<li key={index}>{rec}</li>
											))}
										</ul>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</>
				)}
				<Button size={'3xl'} color={'gray'} onClick={prevStep}>
					{t('Back')}
				</Button>
			</div>
		</DashboardLayout>
	)
}

export default AIKnowledgeSummary
