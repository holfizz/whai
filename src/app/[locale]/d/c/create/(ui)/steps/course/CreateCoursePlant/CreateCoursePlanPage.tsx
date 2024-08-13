import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import {
	useCreateCoursePlanWithAI,
	useGetPlanId,
	useUpdateCoursePlanWithAI
} from '@/entities/plan/model/plan.queries'
import { Link } from '@/navigation'
import { getCourseByIdRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import useUnifiedStore from '../../../../(model)/unified.state'
import TopicPlanAccordion from './TopicPlanAccordion'

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
		coursePlanStateData,
		summaryData,
		setCoursePlanStateData,
		setIsCoursePlanGenerated,
		nextStep,
		prevStep
	} = useUnifiedStore()

	const { getCoursePlan, coursePlanData, coursePlanLoading } = useGetPlanId()
	const { courseAIHistory } = useGetCourseAIHistoryByCourseId(courseId)

	const { updateCoursePlanWithAI } = useUpdateCoursePlanWithAI()

	useEffect(() => {
		if (createPlanData) {
			const planId = createPlanData.id
			setCoursePlanStateData(planId)
			setIsCoursePlanGenerated(true)
		}
	}, [createPlanData, setCoursePlanStateData, setIsCoursePlanGenerated])

	useEffect(() => {
		if (coursePlanStateData) {
			getCoursePlan({
				variables: { planId: coursePlanStateData }
			})
		}
	}, [coursePlanStateData, getCoursePlan])

	useEffect(() => {
		const req = async () => {
			if (
				courseId &&
				courseAIHistory &&
				selectedTitle &&
				selectedDescription &&
				!coursePlanStateData &&
				!coursePlanData &&
				!createPlanLoading
			) {
				await createCoursePlanWithAI({
					variables: {
						CoursePlanWithAIInput: {
							name: selectedTitle,
							description: selectedDescription,
							courseAIHistoryId: courseAIHistory?.id,
							courseId: courseId,
							userKnowledge: JSON.stringify(summaryData),
							isHasVideo: videosFromYouTube || false
						}
					}
				})
			}
		}
		req()
	}, [
		courseId,
		selectedTitle,
		selectedDescription,
		videosFromYouTube,
		createPlanLoading,
		coursePlanStateData,
		coursePlanData,
		createCoursePlanWithAI,
		courseAIHistory,
		summaryData
	])

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
		} else if (view === 'subtopics') {
			setSelectedTopic(null)
			setView('topics')
		} else {
			prevStep()
		}
	}

	const handleUpdateOrder = async newOrder => {
		if (!coursePlanStateData) return
		try {
		} catch (error) {
			console.error('Error updating course plan order:', error)
		}
	}

	const breadcrumbs = [
		<BreadcrumbItem key='course'>{selectedTitle}</BreadcrumbItem>,
		view === 'subtopics' && selectedTopic && (
			<BreadcrumbItem key='topic'>{selectedTopic.name}</BreadcrumbItem>
		),
		view === 'lessons' && selectedSubtopic && (
			<BreadcrumbItem key='subtopic'>{selectedSubtopic.name}</BreadcrumbItem>
		)
	].filter(Boolean) // Remove null or undefined items

	const currentStageTitle = {
		topics: t('Editing stage of the training module'),
		subtopics: t('Editing Course Topics'),
		lessons: t('Editing lessons')
	}

	return (
		<DashboardLayout className='w-full flex justify-center'>
			<div className='w-full max-w-[1200px] p-4 flex flex-col items-center justify-center'>
				{(createPlanLoading || coursePlanLoading) && <DotsLoader />}
				{createPlanError && (
					<div>Ошибка загрузки плана курса: {createPlanError.message}</div>
				)}
				{coursePlanData && (
					<>
						<div className='flex flex-col items-center w-[80%]'>
							<h1 className='text-4xl'>{currentStageTitle[view]}</h1>
							<Breadcrumbs className='mt-8'>{breadcrumbs}</Breadcrumbs>
							<div className='flex flex-col justify-center gap-6 mt-10 w-full'>
								<TopicPlanAccordion
									topicsAllData={coursePlanData.topics}
									t={t}
									onUpdateOrder={handleUpdateOrder}
								/>
							</div>
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
						<Button
							color={'main'}
							size={'3xl'}
							as={Link}
							href={getCourseByIdRoute(courseId)}
						>
							{t('Save')}
						</Button>
					)}
				</div>
			</div>
		</DashboardLayout>
	)
}

export default CreateCoursePlanPage
