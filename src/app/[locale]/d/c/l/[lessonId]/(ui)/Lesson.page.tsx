'use client'
import React, { useCallback, useEffect } from 'react'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import cls from './LessonPage.module.scss'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ILessonBlock, useGetLessonContent } from '@/entities/lesson'
import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { Skeleton } from '@nextui-org/react'

const LessonPageAsync = () => {
	const { lessonId } = useParams<{ lessonId: string }>()
	const t = useTranslations('Lesson')
	const { lessonContentData, errorLessonContent, loadingLessonContent } =
		useGetLessonContent(lessonId)

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
					<div key={block.id} className={cls.block}>
						<Text text={block.text} />
					</div>
				)
			case 'VIDEO':
				return (
					<div key={block.id} className={cls.block}>
						<iframe src={block.videoUrl} title='video' className={cls.video} />
					</div>
				)
			default:
				return null
		}
	}, [])

	useEffect(() => {
		if (lessonId) {
			// Fetch lesson content when lessonId changes
		}
	}, [lessonId])

	let content

	if (loadingLessonContent) {
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
			</>
		)
	} else if (errorLessonContent) {
		content = (
			<Text
				theme={TextTheme.ERROR}
				title={t('There was an error loading the lesson')}
			/>
		)
	} else {
		content = (
			<>
				<Text size={TextSize.XL} title={lessonContentData?.name} />
				{lessonContentData.lessonBlocks.length > 0 ? (
					lessonContentData.lessonBlocks.map(renderBlock)
				) : (
					<h1>Урок пустой</h1>
				)}
			</>
		)
	}
	return (
		<DashboardLayout>
			<div className={cls.LessonDetails}>
				<div className={cls.content}>{content}</div>
			</div>
		</DashboardLayout>
	)
}

export default LessonPageAsync
