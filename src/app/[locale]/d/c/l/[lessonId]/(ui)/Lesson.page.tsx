'use client'

import { useGetCourse } from '@/entities/course'
import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { ILessonBlock, useGetLessonContent } from '@/entities/lesson'
import { CREATE_LESSON_WITH_AI } from '@/entities/lesson/model/lesson.queries'
import { ChatWithAI } from '@/features/chatWithAI'
import { getCourseByIdRoute } from '@/shared/const/router'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import MDX from '@/shared/ui/MDX/MDX'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useMutation } from '@apollo/client'
import { BreadcrumbItem, Breadcrumbs, Skeleton } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import cls from './LessonPage.module.scss'

const LessonPageAsync = () => {
	const { lessonId } = useParams<{ lessonId: string }>()
	const t = useTranslations('Lesson')
	const { lessonContentData, errorLessonContent, loadingLessonContent } =
		useGetLessonContent(lessonId)
	const { courseData } = useGetCourse(lessonContentData?.courseId)
	const { courseAIHistory } = useGetCourseAIHistoryByCourseId(
		lessonContentData?.courseId
	)

	const [
		createLessonWithAI,
		{ loading: creatingLesson, error: createLessonError }
	] = useMutation(CREATE_LESSON_WITH_AI)

	const [isLessonCreated, setIsLessonCreated] = useState(false)
	const [lessonIdCreated, setLessonIdCreated] = useState<string | null>(null)

	const renderBlock = useCallback((block: ILessonBlock) => {
		switch (block.type) {
			case 'CODE':
				return (
					<pre key={block.id} className={cls.block}>
						<h1>{block.code}</h1>
					</pre>
				)
			case 'IMAGE':
				return (
					<div key={block.id} className={cls.block}>
						<img src={block.imageUrl} alt='' className={cls.image} />
					</div>
				)
			case 'TEXT':
				return (
					<div key={block.id} className={cls.blockImage}>
						<MDX>{block.text}</MDX>
					</div>
				)
			case 'VIDEO':
				const videoUrl = block.videoUrl.includes('youtube.com')
					? block.videoUrl.replace('watch?v=', 'embed/')
					: block.videoUrl
				return (
					<div key={block.id} className={cls.videoBlock}>
						<div className={cls.videoContainer}>
							<iframe
								src={videoUrl}
								title='video'
								className={cls.video}
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
							/>
						</div>
					</div>
				)
			default:
				return null
		}
	}, [])

	useEffect(() => {
		if (lessonId) {
			// Fetch lesson content when lessonId changes
			if (lessonContentData?.lessonBlocks.length === 0 && !isLessonCreated) {
				createLessonWithAI({
					variables: {
						input: {
							id: lessonId,
							courseAIHistoryId: courseAIHistory?.id,
							courseId: lessonContentData?.courseId,
							name: lessonContentData?.name,
							subtopicId: lessonContentData?.subtopicId
						}
					}
				})
					.then(({ data }) => {
						if (data?.createLessonWithAI) {
							setIsLessonCreated(true)
							setLessonIdCreated(data.createLessonWithAI.id) // assuming createLessonWithAI returns created lesson
						}
					})
					.catch(error => {
						console.error(error)
					})
			}
		}
	}, [
		lessonId,
		lessonContentData,
		createLessonWithAI,
		isLessonCreated,
		courseAIHistory?.id
	])

	let content

	if (loadingLessonContent || creatingLesson) {
		content = (
			<>
				<div className='mt-10 flex items-center w-full justify-center'>
					<h1>{t('Lesson creation in progress')}</h1>
					<DotsLoader />
				</div>
				<Skeleton
					className={'mt-10 rounded-xl'}
					style={{ width: '80%', height: 30 }}
				/>
				<Skeleton
					className={'mt-5 rounded-xl'}
					style={{ width: '100%', height: 90 }}
				/>
				<Skeleton
					className={'mt-5 rounded-xl'}
					style={{ width: '90%', height: 270 }}
				/>
				<Skeleton
					className={'mt-5 rounded-xl'}
					style={{ width: '50%', height: 100 }}
				/>
				<Skeleton
					className={'mt-5 rounded-xl'}
					style={{ width: '70%', height: 120 }}
				/>
				<Skeleton
					className={'mt-5 rounded-xl'}
					style={{ width: '40%', height: 40 }}
				/>
			</>
		)
	} else if (errorLessonContent || createLessonError) {
		content = (
			<h1>{t('There was an error loading the lesson or creating it')}</h1>
		)
	} else {
		// At this point, the lesson should either contain content or have been created successfully
		if (lessonContentData.lessonBlocks.length > 0) {
			content = (
				<>
					<h1>{lessonContentData?.name}</h1>
					{lessonContentData.lessonBlocks.map(renderBlock)}
				</>
			)
		} else {
			content = <h1>{t('Lesson is empty')}</h1>
		}
	}

	return (
		<DashboardLayout>
			<div className={cls.LessonDetails}>
				<div className={cls.content}>
					<Breadcrumbs>
						<BreadcrumbItem
							href={getCourseByIdRoute(lessonContentData?.courseId)}
						>
							{t('Course')}: {courseData?.name}
						</BreadcrumbItem>
						<BreadcrumbItem>
							{t('Lesson')}: {lessonContentData?.name}
						</BreadcrumbItem>
					</Breadcrumbs>
					{content}
					<ChatWithAI lessonId={lessonId} />
				</div>
			</div>
		</DashboardLayout>
	)
}

export default LessonPageAsync
