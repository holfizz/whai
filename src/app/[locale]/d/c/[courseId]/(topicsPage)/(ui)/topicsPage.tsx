'use client'
import { useGetCourse } from '@/entities/course'
import { useGetAllTopics } from '@/entities/topic'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import ClockIcon from '@/shared/assets/icons/Clock'
import ListIcon from '@/shared/assets/icons/List'
import Button from '@/shared/ui/Button/Button'
import { Progress } from '@/shared/ui/Progress/Progress'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useDisclosure } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import FlagIcon from '@/shared/assets/icons/Flag'
import LockIcon from '@/shared/assets/icons/Lock'
import VideoIcon from '@/shared/assets/icons/Video'
import { getSubscriptionsRoute } from '@/shared/const/router'
import ModalComponent from '../ModalComponent/ModalComponent'
import cls from './topicPage.module.scss'

const TopicsPage = () => {
	const { courseId, topicId: initialTopicId } = useParams<{
		courseId: string
		topicId?: string
	}>()
	const { userData } = useGetProfile()
	const { topicsAllData } = useGetAllTopics(courseId)
	const { courseData } = useGetCourse(courseId)
	const searchParams = useSearchParams()
	const t = useTranslations('TopicsPage')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
	const [selectedSubtopicId, setSelectedSubtopicId] = useState<string | null>(
		null
	)
	const router = useRouter()

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const queryTopicId = urlParams.get('topicId')
		const querySubtopicId = urlParams.get('subtopicId')

		setSelectedTopicId(queryTopicId || null)
		setSelectedSubtopicId(querySubtopicId || null)

		if (queryTopicId) {
			onOpen()
		} else {
			onClose()
		}
	}, [initialTopicId, selectedTopicId, searchParams, onOpen, onClose])

	const isOpenResult = isOpen && selectedTopicId !== 'undefined'
	const handleTopicClick = (topicId: string) => {
		setSelectedTopicId(topicId)
		setSelectedSubtopicId(null)
		const urlParams = new URLSearchParams(window.location.search)
		router.push(`/ru/d/c/${courseId}?topicId=${topicId}`)
	}

	const handleSubtopicClick = (subtopicId: string) => {
		setSelectedSubtopicId(subtopicId)
		router.push(
			`/ru/d/c/${courseId}?topicId=${selectedTopicId}&subtopicId=${subtopicId}`
		)
		onOpen()
	}
	if (courseData?.isTrial && !userData?.isTrial) {
		return (
			<DashboardLayout className='w-full flex justify-center'>
				<div className='w-full h-[90vh] flex items-center justify-center'>
					<div className='absolute inset-0 bg-white bg-opacity-50  flex items-center justify-center w-full h-full'>
						<div className='flex items-center justify-center flex-col'>
							<LockIcon />
							<h2 className='text-xl font-bold'>{t('Blocked')}</h2>
							<p className='w-[80%] text-center'>
								{t('You used the trial period to unlock, subscribe')}
							</p>
							<Button
								color='accent'
								as={Link}
								className='mt-4 rounded-xl'
								href={getSubscriptionsRoute()}
							>
								{t('Subscribe')}
							</Button>
						</div>
					</div>
				</div>
			</DashboardLayout>
		)
	}
	return (
		<DashboardLayout className='w-full flex justify-center'>
			<div className='w-full max-w-[800px]'>
				<h1 className='text-2xl font-normal max-md:text-3xl max-md:text-center max-md:w-2/3 mx-auto max-sm:w-4/5'>
					{courseData?.name}
				</h1>
				<div className='flex w-full items-center justify-center'>
					<div className='flex gap-4 w-[75vw]'>
						<Button
							as={Link}
							href={'mailto:support@whai.ru'}
							startContent={
								<FlagIcon fontSize={18} color={'var(--color-decor-2)'} />
							}
							className={cls.actionButton}
						>
							<h3 className='text-[var(--color-secondary)] text-lg'>
								{t('Report a bug')}
							</h3>
						</Button>
					</div>
				</div>
				<div
					className='grid gap-6 mt-5 justify-center'
					style={{
						gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 0.8fr))',
						gridAutoRows: 'minmax(250px, auto)'
					}}
				>
					{topicsAllData && topicsAllData.length > 0 ? (
						topicsAllData.map(topic => (
							<div
								className='bg-white rounded-xl p-4 flex flex-col justify-between shadow-sm'
								key={topic.id}
								style={{
									gridColumn:
										topicsAllData.length === 1 ||
										(topicsAllData.length === 2 &&
											topic.id === topicsAllData[0].id)
											? 'span 2'
											: 'span 1'
								}}
							>
								<div className='flex justify-between'>
									<h1
										onClick={() => handleTopicClick(topic.id)}
										className={cls.title}
									>
										{topic.name}
									</h1>
									<Button
										onClick={() => handleTopicClick(topic.id)}
										variant='circle'
										size='sRound'
										startContent={<ArrowUpRight fill='var(--color-accent)' />}
										color='main'
									/>
								</div>
								<p className={cls.description}>{topic.description}</p>
								<div className='flex gap-2 flex-wrap w-full mt-auto'>
									<div className='flex mr-4 items-center'>
										<ClockIcon fontSize={18} className='text-gray-2 mx-2' />
										<h3 className='text-gray-2 font-normal'>{`${topic.completionTime} Hours`}</h3>
									</div>
									<div className='flex mr-4 items-center'>
										<VideoIcon fontSize={24} className='text-gray-2 mx-2' />
										<h3 className='text-gray-2 font-normal'>
											{t('Video lesson')}
										</h3>
									</div>
									<div className='flex mr-4 items-center'>
										<ListIcon fontSize={18} className='text-gray-2 mx-2' />
										<h3 className='text-gray-2 font-normal'>{`${
											topic.totalSubtopics
										} ${t('Topics')}`}</h3>
									</div>
								</div>
								<Progress
									color='peach'
									value={topic.progressPercents}
									className='h-1 rounded-full mt-2'
								/>
							</div>
						))
					) : (
						<div>No topics available.</div>
					)}
				</div>
			</div>
			<ModalComponent
				topicId={selectedTopicId}
				subtopicId={selectedSubtopicId}
				isOpen={isOpenResult}
				onClose={onClose}
			/>
		</DashboardLayout>
	)
}

export default TopicsPage
