import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import {
	useCreateCoursePlanWithAI,
	useGetPlanId,
	useUpdateCoursePlanWithAI
} from '@/entities/plan/model/plan.queries'
import { Link } from '@/navigation'
import RegenerateIcon from '@/shared/assets/icons/Regenerate'
import { getCourseByIdRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import useUnifiedStore from '../../../../(model)/unified.state'
import TopicPlanAccordion from './TopicPlanAccordion'

const CreateCoursePlanPage = () => {
	const t = useTranslations('CreateCoursePlanPage')
	const [view, setView] = useState('topics')
	const [selectedTopic, setSelectedTopic] = useState(null)
	const [selectedSubtopic, setSelectedSubtopic] = useState(null)
	const [hasError, setHasError] = useState(false)

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

	const {
		getCoursePlan,
		coursePlanData,
		coursePlanLoading,
		coursePlanRefetch
	} = useGetPlanId()
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
		const createPlan = async () => {
			if (
				courseId &&
				courseAIHistory &&
				selectedTitle &&
				selectedDescription &&
				!coursePlanStateData &&
				!coursePlanData &&
				!createPlanLoading &&
				!hasError
			) {
				try {
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
				} catch (error) {
					setHasError(true)
				}
			}
		}

		if (!coursePlanStateData && !createPlanData && !hasError) {
			createPlan()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		courseAIHistory,
		coursePlanData,
		coursePlanStateData,
		createCoursePlanWithAI,
		createPlanData,
		createPlanLoading,
		hasError,
		selectedDescription,
		selectedTitle,
		summaryData,
		videosFromYouTube
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
				{(createPlanLoading || coursePlanLoading) && (
					<>
						<h1 className='text-2xl font-bold max-md:w-[80vw] max-md:text-center'>
							{t('We continue to create the course')}
						</h1>
						<h3 className='text-sm text-gray-3 mt-4 max-md:w-[60vw] max-md:text-center'>
							{t(
								'We continue to create the courseThis will take a couple of minutes Please do not close the page'
							)}
						</h3>
						<BigDotsLoader className='mt-8' />
					</>
				)}
				{createPlanError && (
					<div>
						<h1 className='text-2xl text-error-text'>
							{t('Oops Error please try again')}
						</h1>
						<div className='w-fll flex mt-10 items-center justify-center'>
							<Button
								className='w-auto px-20 h-[70px]  rounded-3xl ml-5'
								color={'main'}
								onClick={prevStep}
							>
								{t('Back')}
							</Button>
							<Button
								className='ml-5 h-[70px] w-[70px] aspect-square rounded-3xl p-0'
								color={'gray'}
								isIconOnly
								startContent={<RegenerateIcon />}
								onClick={() => window.location.reload()}
							/>
						</div>
					</div>
				)}
				{coursePlanData && (
					<>
						<div className='flex flex-col items-center w-[80%] max-md:w-[95%]'>
							<h1 className='text-4xl'>{currentStageTitle[view]}</h1>
							<Breadcrumbs className='mt-8'>{breadcrumbs}</Breadcrumbs>
							<div className='flex flex-col justify-center gap-6 mt-10 w-full'>
								<TopicPlanAccordion
									topicsAllData={coursePlanData.topics}
									t={t}
									// onUpdateOrder={handleUpdateOrder}
								/>
							</div>
						</div>
					</>
				)}
				<div className='flex gap-5 mt-10 max-md:flex-col'>
					<Button
						color={'gray'}
						size={'3xl'}
						onClick={handleBackClick}
						className='col-span-full max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[50vw]'
					>
						{t('Back')}
					</Button>
					{coursePlanStateData && (
						<Button
							className='max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[50vw]'
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
