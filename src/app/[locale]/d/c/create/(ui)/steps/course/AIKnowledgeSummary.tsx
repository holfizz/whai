import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory/'
import { useGenerateKnowledgeSum } from '@/entities/quiz'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { Accordion, AccordionItem, Divider } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useUnifiedStore from '../../../(model)/unified.state'

const getChipColor = (type: string) => {
	if (type === 'strong') return 'success'
	if (type === 'weak') return 'warning'
	if (type === 'recommendation') return 'info'
	return 'default'
}

const getChipText = (type: string): 'Strong' | 'Weak' | 'Recommendation' => {
	if (type === 'strong') return 'Strong'
	if (type === 'weak') return 'Weak'
	if (type === 'recommendation') return 'Recommendation'
	return 'Other'
}

const AIKnowledgeSummary = () => {
	const t = useTranslations('CreateCourse')
	const {
		courseId,
		prevStep,
		nextStep,
		summaryData,
		setSummaryData,
		quizResultId
	} = useUnifiedStore()
	const {
		generateKnowledgeSum,
		knowledgeSumData,
		knowledgeSumError,
		knowledgeSumLoading
	} = useGenerateKnowledgeSum()
	const { courseAIHistory } = useGetCourseAIHistoryByCourseId(courseId)

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
		}
	}, [
		quizResultId,
		generateKnowledgeSum,
		courseAIHistory,
		courseId,
		summaryData
	])
	useEffect(() => {
		if (knowledgeSumData) {
			setSummaryData(knowledgeSumData)
		}
	}, [knowledgeSumData, setSummaryData])

	if (knowledgeSumError) {
		toast.error(t('An error occurred while summing up your test results'))
	}

	return (
		<DashboardLayout>
			<div className={'flex flex-col items-center justify-center'}>
				{knowledgeSumLoading && <DotsLoader />}
				{summaryData && (
					<>
						<h3>{t('Summary of your knowledge')}</h3>
						<Accordion className='w-[80%]'>
							{summaryData.summary && (
								<AccordionItem
									title={
										<div className='flex'>
											<p className='text-lg break-words'>
												{t('Knowledge Summary')}
											</p>
										</div>
									}
								>
									<p>{summaryData.summary}</p>
								</AccordionItem>
							)}
							{summaryData.strongPoints.length > 0 && (
								<AccordionItem
									title={
										<div className='flex'>
											<p className='text-lg break-words'>
												{t('Strong Points')}
											</p>
										</div>
									}
								>
									<div className={'flex'}>
										<Divider
											orientation='vertical'
											className={'w-[3px] rounded-sm h-[inherit] mr-3'}
										/>
										<ul>
											{summaryData.strongPoints.map((point, index) => (
												<li key={index} className='break-words'>
													{point}
												</li>
											))}
										</ul>
									</div>
								</AccordionItem>
							)}
							{summaryData.weakPoints.length > 0 && (
								<AccordionItem
									title={
										<div className='flex'>
											<p className='text-lg break-words'>{t('Weak Points')}</p>
										</div>
									}
								>
									<div className={'flex'}>
										<Divider
											orientation='vertical'
											className={'w-[3px] rounded-sm h-[inherit] mr-3'}
										/>
										<ul>
											{summaryData.weakPoints.map((point, index) => (
												<li key={index} className='break-words'>
													{point}
												</li>
											))}
										</ul>
									</div>
								</AccordionItem>
							)}
							{summaryData.recommendations.length > 0 && (
								<AccordionItem
									title={
										<div className='flex'>
											<p className='text-lg break-words'>
												{t('Recommendations')}
											</p>
										</div>
									}
								>
									<div className={'flex'}>
										<Divider
											orientation='vertical'
											className={'w-[3px] rounded-sm h-[inherit] mr-3'}
										/>
										<ul>
											{summaryData.recommendations.map((rec, index) => (
												<li key={index} className='break-words'>
													{rec}
												</li>
											))}
										</ul>
									</div>
								</AccordionItem>
							)}
						</Accordion>
					</>
				)}
				{summaryData && (
					<div className={'flex gap-5 mt-4'}>
						<Button size={'3xl'} color={'gray'} onClick={prevStep}>
							{t('Back')}
						</Button>
						<Button size={'3xl'} color={'main'} onClick={nextStep}>
							{t('Next')}
						</Button>
					</div>
				)}
			</div>
			<Toaster position='top-right' reverseOrder={false} />
		</DashboardLayout>
	)
}

export default AIKnowledgeSummary
