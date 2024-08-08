import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { useCreateCoursePlanWithAI } from '@/entities/plan/model/plan.queries'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import useUnifiedStore from '../../../../(model)/unified.state'
import LessonPlan from './LessonPlan'
import SubtopicPlan from './SubtopicPlan'
import TopicPlan from './TopicPlan'

const CreateCoursePlanPage = () => {
	const [view, setView] = useState('topics')
	const [selectedTopic, setSelectedTopic] = useState(null)
	const [selectedSubtopic, setSelectedSubtopic] = useState(null)
	const t = useTranslations('CreateCoursePlanPage')

	const {
		createCoursePlanWithAI,
		createPlanData,
		createPlanError,
		createPlanLoading
	} = useCreateCoursePlanWithAI()

	const {
		courseId,
		selectedTitle,
		selectedDescription,
		videosFromYouTube,
		summaryData,
		coursePlanStateData,
		isCoursePlanGenerated,
		setCourseId,
		setCoursePlanStateData,
		setIsCoursePlanGenerated,
		nextStep,
		prevStep
	} = useUnifiedStore()

	const { courseAIHistory } = useGetCourseAIHistoryByCourseId(courseId)

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
			!coursePlanStateData &&
			!isCoursePlanGenerated
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
		coursePlanStateData,
		isCoursePlanGenerated
	])

	useEffect(() => {
		if (createPlanData) {
			setCoursePlanStateData(createPlanData)
			setIsCoursePlanGenerated(true)
		}
	}, [createPlanData, setCoursePlanStateData, setIsCoursePlanGenerated])

	const handleTopicClick = topic => {
		setSelectedTopic(topic)
		setSelectedSubtopic(null)
		setView('subtopics')
	}

	const handleSubtopicClick = subtopic => {
		setSelectedSubtopic(subtopic)
		setView('lessons')
	}

	const handleBackClick = () => {
		if (view === 'lessons') {
			setSelectedSubtopic(null)
			setView('subtopics')
			return
		} else if (view === 'subtopics') {
			setSelectedTopic(null)
			setView('topics')
			return
		}
		prevStep()
		return
	}

	let breadcrumbs = []

	if (view === 'topics') {
		breadcrumbs = [
			<BreadcrumbItem key='course'>{selectedTitle}</BreadcrumbItem>
		]
	} else if (view === 'subtopics' && selectedTopic) {
		breadcrumbs = [
			<BreadcrumbItem key='course'>{selectedTitle}</BreadcrumbItem>,
			<BreadcrumbItem key='topic'>{selectedTopic.name}</BreadcrumbItem>
		]
	} else if (view === 'lessons' && selectedSubtopic) {
		breadcrumbs = [
			<BreadcrumbItem key='course'>{selectedTitle}</BreadcrumbItem>,
			<BreadcrumbItem key='topic'>{selectedTopic.name}</BreadcrumbItem>,
			<BreadcrumbItem key='subtopic'>{selectedSubtopic.name}</BreadcrumbItem>
		]
	}

	const currentStageTitle = {
		topics: t('Editing stage of the training module'),
		subtopics: t('Editing Course Topics'),
		lessons: t('Editing lessons')
	}

	return (
		<DashboardLayout className='w-full flex justify-center'>
			<div className='w-full max-w-[1200px] p-4 flex flex-col items-center justify-center'>
				{createPlanLoading && <DotsLoader />}
				{createPlanError && (
					<div>Ошибка загрузки плана курса: {createPlanError.message}</div>
				)}
				{coursePlanStateData && coursePlanStateData.topics.length > 0 && (
					<>
						<div className='flex flex-col items-center'>
							<Text size={TextSize.XL} title={currentStageTitle[view]} />
							<Breadcrumbs className='mt-8'>{breadcrumbs}</Breadcrumbs>
							{view === 'topics' && (
								<div className='grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3'>
									<TopicPlan
										topicsAllData={coursePlanStateData.topics}
										handleTopicClick={handleTopicClick}
										t={t}
									/>
								</div>
							)}
							{view === 'subtopics' && selectedTopic && (
								<div className='grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3'>
									<SubtopicPlan
										subtopicsAllData={selectedTopic.subtopics}
										handleSubtopicClick={handleSubtopicClick}
										t={t}
									/>
								</div>
							)}
							{view === 'lessons' && selectedSubtopic && (
								<div className='grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3'>
									<LessonPlan lessonsAllData={selectedSubtopic.lessons} t={t} />
								</div>
							)}
						</div>
					</>
				)}

				<div className='flex gap-5 mt-10'>
					<Button
						color={'gray'}
						size={'3xl'}
						onClick={handleBackClick}
						className='col-span-full'
					>
						{t('Back')}
					</Button>
					{coursePlanStateData && (
						<Button color={'main'} size={'3xl'} onClick={nextStep}>
							{t('Save')}
						</Button>
					)}
				</div>
			</div>
		</DashboardLayout>
	)
}

export default CreateCoursePlanPage