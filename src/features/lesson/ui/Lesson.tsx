import { ILessonBlock, ILessonContent } from '@/entities/lesson'
import { ChatWithAI } from '@/features/chatWithAI'
import { getCourseByIdRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import MDX from '@/shared/ui/MDX/MDX'
import { BreadcrumbItem, Breadcrumbs, Skeleton } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { FC, useCallback } from 'react'
import cls from './Lesson.module.scss'

interface LessonProps {
	lessonId: string
	lessonContentData: ILessonContent
	courseAIHistoryId?: string
	loadingLessonContent: boolean
	errorLessonContent: Error | null
	createLessonError: Error | null
	creatingLesson: boolean
	isIndependent?: boolean
}

const Lesson: FC<LessonProps> = ({
	lessonId,
	lessonContentData,
	courseAIHistoryId,
	loadingLessonContent,
	errorLessonContent,
	createLessonError,
	creatingLesson,
	isIndependent = false
}) => {
	const t = useTranslations('Lesson')

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
			<div className='w-fill flex flex-col items-center justify-center mt-10'>
				<h1>{t('There was an error loading the lesson or creating it')}</h1>
				<Button
					onClick={() => window.location.reload()}
					size='3xl'
					color='main'
				>
					{t('Try again')}
				</Button>
			</div>
		)
	} else {
		if (lessonContentData?.lessonBlocks?.length > 0) {
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
		<div className={cls.LessonDetails}>
			<div className={cls.content}>
				{!isIndependent && (
					<Breadcrumbs>
						<BreadcrumbItem
							href={getCourseByIdRoute(lessonContentData?.courseId)}
						>
							{t('Course')}: {lessonContentData?.courseId}
						</BreadcrumbItem>
						<BreadcrumbItem>
							{t('Lesson')}: {lessonContentData?.name}
						</BreadcrumbItem>
					</Breadcrumbs>
				)}

				{content}
				<ChatWithAI lessonId={lessonId} />
			</div>
		</div>
	)
}

export default Lesson
