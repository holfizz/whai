import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { useCreateCoursePlanWithAI } from '@/entities/plan/model/plan.queries'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import useCourseStore from '../../../(model)/create-page.store'
import LessonPlan from './LessonPlan'
import SubtopicPlan from './SubtopicPlan'
import TopicPlan from './TopicPlan'

const CreateCoursePlanPage = () => {
	const [selectedTopicId, setSelectedTopicId] = useState('')
	const [selectedSubtopicId, setSelectedSubtopicId] = useState('')
	const t = useTranslations('CreateCoursePlanPage')
	const {
		createCoursePlanWithAI,
		createPlanData,
		createPlanError,
		createPlanLoading
	} = useCreateCoursePlanWithAI()
	const {
		step,
		choice,
		courseId,
		promptContent,
		selectedTitle,
		selectedDescription,
		videosFromYouTube,
		generateImages,
		needHomework,
		quizId,
		summaryData,
		coursePlanStateData,
		setStep,
		setChoice,
		setCourseId,
		setPromptContent,
		setSelectedTitle,
		setSelectedDescription,
		setVideosFromYouTube,
		setGenerateImages,
		setNeedHomework,
		setQuizId,
		setSummaryData,
		setCoursePlanStateData,
		nextStep,
		prevStep,
		resetState
	} = useCourseStore()
	const { courseAIHistory } = useGetCourseAIHistoryByCourseId(courseId)

	const handleTopicClick = topicId => {
		setSelectedTopicId(topicId)
		setSelectedSubtopicId('')
	}

	useEffect(() => {
		if (courseId) {
			setCourseId(courseId)
		}
	}, [courseId, setCourseId])

	useEffect(() => {
		if (
			courseAIHistory &&
			selectedTitle &&
			selectedDescription &&
			courseId &&
			!coursePlanStateData
		) {
			createCoursePlanWithAI({
				variables: {
					CoursePlanWithAIInput: {
						name: selectedTitle,
						description: selectedDescription,
						courseAIHistoryId: courseAIHistory.id,
						courseId: courseId,
						userKnowledge: JSON.stringify(summaryData),
						isHasVideo: videosFromYouTube || false
					}
				}
			})
		}
	}, [
		courseAIHistory,
		selectedTitle,
		selectedDescription,
		courseId,
		summaryData,
		videosFromYouTube,
		createCoursePlanWithAI,
		coursePlanStateData
	])

	useEffect(() => {
		setCoursePlanStateData(createPlanData)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createPlanData])

	return (
		<DashboardLayout className='w-full flex justify-center'>
			<div className='w-[800px]'>
				{createPlanLoading && !createPlanData && <DotsLoader />}
				{createPlanData && <h1>{createPlanData.name}</h1>}
				{createPlanData && (
					<>
						<Text size={TextSize.XL} title={createPlanData.name} />
						<div className='flex flex-wrap gap-6 mt-10'>
							{!selectedTopicId && (
								<TopicPlan
									topicsAllData={createPlanData.topics}
									handleTopicClick={handleTopicClick}
									t={t}
								/>
							)}
							{selectedTopicId && !selectedSubtopicId && (
								<SubtopicPlan
									subtopicsAllData={
										createPlanData.topics.find(
											topic => topic.id === selectedTopicId
										)?.subtopics || []
									}
									handleSubtopicClick={setSelectedSubtopicId}
									t={t}
								/>
							)}
							{selectedSubtopicId && (
								<LessonPlan
									lessonsAllData={
										createPlanData.topics
											.find(topic => topic.id === selectedTopicId)
											?.subtopics.find(
												subtopic => subtopic.id === selectedSubtopicId
											)?.lessons || []
									}
									t={t}
								/>
							)}
						</div>
					</>
				)}
				<Button className='mt-4' onClick={nextStep}>
					{t('Skip')}
				</Button>
			</div>
		</DashboardLayout>
	)
}

export default CreateCoursePlanPage
