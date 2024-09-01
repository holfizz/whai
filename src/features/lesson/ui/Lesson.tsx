import { ILessonBlock, ILessonContent } from '@/entities/lesson'
import {
	GET_BREADCRUMBS,
	GET_PREV_NEXT_LESSON,
	useUpdateLessonCompleted
} from '@/entities/lesson/model/lesson.queries'
import { ChatWithAI } from '@/features/chatWithAI'
import {
	getCourseByIdRoute,
	getLessonRoute,
	getLessonTaskRoute
} from '@/shared/const/router'
import logger from '@/shared/lib/utils/logger'
import Button from '@/shared/ui/Button/Button'
import MDX from '@/shared/ui/MDX/MDX'
import { useLazyQuery, useQuery } from '@apollo/client'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC, useCallback, useEffect, useState } from 'react'
import cls from './Lesson.module.scss'

interface LessonProps {
	lessonId: string
	lessonContentData: ILessonContent
	errorLessonContent: Error | null
	createLessonError: Error | null
	creatingLesson: boolean
	isIndependent?: boolean
}

const Lesson: FC<LessonProps> = ({
	lessonId,
	lessonContentData,
	errorLessonContent,
	createLessonError,
	isIndependent = false
}) => {
	const t = useTranslations('Lesson')

	const [getPrevNextLesson, { data: prevNextData, loading: prevNextLoading }] =
		useLazyQuery(GET_PREV_NEXT_LESSON)
	const { updateLesson } = useUpdateLessonCompleted()
	const [prevLessonId, setPrevLessonId] = useState<string | null>(null)
	const [nextLessonId, setNextLessonId] = useState<string | null>(null)
	const searchParams = useSearchParams()
	const topicId = searchParams.get('topicId')
	const { data: breadcrumbsData } = useQuery(GET_BREADCRUMBS, {
		variables: {
			courseId: lessonContentData?.courseId,
			topicId: topicId,
			subtopicId: lessonContentData?.subtopicId,
			lessonId: lessonId
		},
		skip: isIndependent
	})

	const completeLesson = useCallback(() => {
		updateLesson({
			variables: {
				updateLessonInput: { id: lessonId, isCompleted: true }
			}
		})
	}, [lessonId, updateLesson])

	useEffect(() => {
		if (!isIndependent && lessonId && lessonContentData?.courseId) {
			getPrevNextLesson({
				variables: {
					courseId: lessonContentData?.courseId,
					lessonId: lessonId
				}
			})
		}
	}, [isIndependent, lessonId, lessonContentData?.courseId, getPrevNextLesson])

	useEffect(() => {
		if (prevNextData?.getPrevNextLesson) {
			setPrevLessonId(prevNextData.getPrevNextLesson.prevLessonId)
			setNextLessonId(prevNextData.getPrevNextLesson.nextLessonId)
			logger.log('prevNextData', prevNextData)
		}
	}, [prevNextData])

	const redirect = ({
		lessonId,
		topicId
	}: {
		lessonId: string
		topicId: string
	}) => {
		if (lessonContentData?.lessonTasks.length > 0) {
			return getLessonTaskRoute(lessonContentData.id)
		} else {
			return getLessonRoute(lessonId, topicId)
		}
	}

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

	let content

	if (lessonContentData?.lessonBlocks?.length > 0) {
		content = <>{lessonContentData.lessonBlocks.map(renderBlock)}</>
	} else {
		content = <h1>{t('Lesson is empty')}</h1>
	}

	return (
		<div className={cls.LessonDetails}>
			<div className={cls.content}>
				{!isIndependent && !errorLessonContent && !createLessonError && (
					<Breadcrumbs>
						<BreadcrumbItem
							href={getCourseByIdRoute(lessonContentData?.courseId)}
						>
							{breadcrumbsData?.getBreadcrumbsToLesson?.courseName}
						</BreadcrumbItem>
						<BreadcrumbItem
							// onClick={() => {
							// 	router.replace()
							// }
							href={getCourseByIdRoute(
								`${lessonContentData?.courseId}`,
								topicId
							)}
						>
							{breadcrumbsData?.getBreadcrumbsToLesson?.topicName}
						</BreadcrumbItem>
						<BreadcrumbItem
							onPress={() => {}}
							href={getCourseByIdRoute(
								`${lessonContentData?.courseId}`,
								topicId,
								lessonContentData?.subtopicId
							)}
						>
							{breadcrumbsData?.getBreadcrumbsToLesson?.subtopicName}
						</BreadcrumbItem>
						<BreadcrumbItem>
							{breadcrumbsData?.getBreadcrumbsToLesson?.lessonName}
						</BreadcrumbItem>
					</Breadcrumbs>
				)}
				{content}
				<ChatWithAI lessonId={lessonId} />
				{!errorLessonContent && !createLessonError && (
					<div className='w-full h-[69px] flex items-center justify-center gap-4 mt-8 mb-16'>
						{!isIndependent && (
							<Button
								color='gray'
								isIconOnly
								isDisabled={!prevLessonId}
								as={Link}
								href={getLessonRoute(prevLessonId, topicId)}
								className='h-[60px] w-[80px] rounded-[20px]'
								startContent={<ArrowRight className='rotate-180' />}
								isLoading={prevNextLoading}
							/>
						)}

						<Button
							onPress={() => {
								completeLesson()
							}}
							as={Link}
							href={getCourseByIdRoute(
								lessonContentData?.courseId,
								topicId,
								lessonContentData?.subtopicId,
								lessonContentData?.id
							)}
							className='h-[60px] w-auto px-6 rounded-[20px]'
							color='gray'
						>
							{t('Complete lesson')}
						</Button>
						{!isIndependent && (
							<Button
								className='h-[60px] w-[80px] rounded-[20px]'
								color='main'
								isIconOnly
								isDisabled={!nextLessonId}
								onPress={completeLesson}
								startContent={<ArrowRight />}
								as={Link}
								href={redirect({ lessonId: nextLessonId, topicId })}
								isLoading={prevNextLoading}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default Lesson
