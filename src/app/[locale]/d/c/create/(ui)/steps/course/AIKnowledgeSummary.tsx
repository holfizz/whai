import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory/'
import { useGenerateKnowledgeSum } from '@/entities/quiz'
import Button from '@/shared/ui/Button/Button'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useUnifiedStore from '../../../(model)/unified.state'

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
		const req = async () => {
			if (!summaryData && quizResultId && courseAIHistory?.id) {
				await generateKnowledgeSum({
					variables: {
						dto: {
							conversationId: courseAIHistory.id,
							quizResultId,
							courseId: courseId
						}
					}
				})
			}
		}
		req()
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
				{knowledgeSumLoading && (
					<>
						<h1 className='text-3xl font-bold max-md:w-[80vw] max-md:text-center'>
							{t(
								'Artificial Intelligence is analyzing your knowledge, please wait'
							)}
						</h1>
						<h3 className='text-lg text-gray-3 mt-4 max-md:w-[60vw] max-md:text-center'>
							{t('This will take some time Please dont close the page')}
						</h3>
						<BigDotsLoader className='mt-8' />
					</>
				)}
				{summaryData && (
					<>
						<h3 className='text-2xl font-bold'>
							{t('Summary of your knowledge')}
						</h3>
						<div className='w-[80%]'>
							{summaryData.summary && (
								<div className='mt-6'>
									<h4 className='text-2xl font-bold mt-4 mb-3'>
										{t('Knowledge Summary')}
									</h4>
									<ul className='pl-5'>
										<li className='text-xl'>{summaryData.summary}</li>
									</ul>
								</div>
							)}
							{summaryData.strongPoints > 0 && (
								<div className='mt-6'>
									<h4 className='text-2xl font-bold mt-4 mb-3'>
										{t('Strong Points')}
									</h4>
									<ul className='pl-5'>
										{summaryData.strongPoints.map((point, index) => (
											<li
												key={index}
												className='text-xl mt-2 flex items-start relative pl-5 before:content-[""] before:absolute before:left-0 before:top-[0.35em] before:w-3 before:h-3 before:bg-decor-2 before:rounded-full'
											>
												{point}
											</li>
										))}
									</ul>
								</div>
							)}
							{summaryData.weakPoints.length > 0 && (
								<div className='mt-6'>
									<h4 className='text-2xl font-bold mt-4 mb-3'>
										{t('Weak Points')}
									</h4>
									<ul className='pl-5'>
										{summaryData.weakPoints.map((point, index) => (
											<li
												key={index}
												className='text-xl mt-2 flex items-start relative pl-5 before:content-[""] before:absolute before:left-0 before:top-[0.35em] before:w-3 before:h-3 before:bg-decor-2 before:rounded-full'
											>
												{point}
											</li>
										))}
									</ul>
								</div>
							)}
							{summaryData.recommendations.length > 0 && (
								<div className='mt-6'>
									<h4 className='text-2xl font-bold mt-4 mb-3'>
										{t('Recommendations')}
									</h4>
									<ul className='pl-5'>
										{summaryData.recommendations.map((rec, index) => (
											<li
												key={index}
												className='text-xl mt-2 flex items-start relative pl-5 before:content-[""] before:absolute before:left-0 before:top-[0.35em] before:w-3 before:h-3 before:bg-decor-2 before:rounded-full'
											>
												{rec}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</>
				)}
				{summaryData && (
					<div className={'flex gap-5 mt-8 max-md:flex-col-reverse'}>
						<Button
							className='max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[60vw]'
							size={'3xl'}
							color={'gray'}
							onClick={prevStep}
						>
							{t('Back')}
						</Button>
						<Button
							className='max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[60vw]'
							size={'3xl'}
							color={'main'}
							onClick={nextStep}
						>
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
