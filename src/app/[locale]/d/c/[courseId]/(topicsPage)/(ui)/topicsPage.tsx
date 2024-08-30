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
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { HiVideoCamera } from 'react-icons/hi'
import ModalComponent from '../ModalComponent/ModalComponent'
import cls from './topicPage.module.scss'

const TopicsPage = () => {
	const { courseId } = useParams<{ courseId: string }>()
	const { topicsAllData } = useGetAllTopics(courseId)
	const { courseData } = useGetCourse(courseId)
	const t = useTranslations('TopicsPage')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [selectedTopicId, setSelectedTopicId] = useState('')

	const handleTopicClick = (topicId: string) => {
		setSelectedTopicId(topicId)
		onOpen()
	}

	return (
		<DashboardLayout className='w-full flex justify-center'>
			<div className='w-full max-w-[800px]'>
				<h1 className='text-2xl font-normal max-md:text-3xl max-md:text-center  max-md:w-2/3 mx-auto max-sm:w-4/5'>
					{courseData?.name}
				</h1>
				<div
					className='grid gap-6 mt-5 justify-center'
					style={{
						gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 0.8fr))',
						gridAutoRows: 'minmax(250px, auto)'
					}}
				>
					{topicsAllData &&
						topicsAllData.map((topic, i) => (
							<div
								className={
									'bg-white rounded-xl p-4 flex flex-col justify-between shadow-sm'
								}
								key={i}
								style={{
									gridColumn:
										topicsAllData.length === 1 ||
										(topicsAllData.length === 2 && i === 0)
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
										variant={'circle'}
										size={'sRound'}
										startContent={<ArrowUpRight fill={'var(--color-accent)'} />}
										color={'main'}
									/>
								</div>
								<p className={cls.description}>{topic.description}</p>
								<div className='flex gap-2 flex-wrap w-full mt-auto'>
									<div className='flex mr-4 items-center'>
										<ClockIcon fontSize={18} className='text-gray-2 mx-2' />
										<h3 className='text-gray-2 font-normal'>
											{`${topic.completionTime} Hours`}
										</h3>
									</div>
									<div className='flex mr-4 items-center'>
										<HiVideoCamera size={24} className='text-gray-2 mx-2' />
										<h3 className='text-gray-2 font-normal'>
											{t('Video lesson')}
										</h3>
									</div>
									<div className='flex mr-4 items-center'>
										<ListIcon fontSize={18} className='text-gray-2 mx-2' />
										<h3 className='text-gray-2 font-normal'>
											{`${topic.totalSubtopics}  ${t('Topics')}`}
										</h3>
									</div>
								</div>
								<Progress
									color={'peach'}
									value={topic.progressPercents}
									className='h-1 rounded-full mt-2'
								/>
							</div>
						))}
				</div>
			</div>
			{isOpen && <ModalComponent topicId={selectedTopicId} onClose={onClose} />}
		</DashboardLayout>
	)
}

export default TopicsPage
