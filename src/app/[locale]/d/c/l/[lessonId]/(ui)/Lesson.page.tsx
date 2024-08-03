'use client'
import { useGetCourse } from '@/entities/course'
import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { ILessonBlock, useGetLessonContent } from '@/entities/lesson'
import { CREATE_LESSON_WITH_AI } from '@/entities/lesson/model/lesson.queries'
import { ChatWithAI } from '@/features/chatWithAI'
import { getCourseByIdRoute } from '@/shared/const/router'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { MDX } from '@/shared/ui/MDX/MDX'
import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
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
						<MDX source={block.text}></MDX>
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
			if (
				lessonContentData?.lessonBlocks.length === 0 &&
				!isLessonCreated &&
				false
			) {
				createLessonWithAI({
					variables: {
						input: {
							courseAIHistoryId: courseAIHistory?.id,
							courseId: lessonContentData?.courseId,
							name: lessonContentData?.name,
							subtopicId: lessonContentData?.subtopicId,
							isHasVideo: false,
							isHasAISearchImage: false
						}
					}
				}).then(({ data }) => {
					if (data?.createLessonWithAI) {
						setIsLessonCreated(true)
					}
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
				<Skeleton
					className={cls.avatar}
					style={{ width: '100%', height: 30 }}
				/>
				<Skeleton className={cls.title} style={{ width: '100%', height: 90 }} />
				<Skeleton
					className={cls.skeleton}
					style={{ width: '100%', height: 270 }}
				/>
				<Skeleton
					className={cls.skeleton}
					style={{ width: '100%', height: 400 }}
				/>
				<Skeleton
					className={cls.skeleton}
					style={{ width: '100%', height: 10 }}
				/>
				<DotsLoader />
			</>
		)
	} else if (errorLessonContent || createLessonError) {
		content = (
			<Text
				theme={TextTheme.ERROR}
				title={t('There was an error loading the lesson or creating it')}
			/>
		)
	} else {
		content = (
			<>
				<Text size={TextSize.XL} title={lessonContentData?.name} />
				{lessonContentData.lessonBlocks.length > 0 ? (
					lessonContentData.lessonBlocks.map(renderBlock)
				) : (
					<h1>{t('Lesson is empty')}</h1>
				)}
			</>
		)
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
