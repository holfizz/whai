'use client'
import { useGetCourse } from '@/entities/course'
import { useGetAllTopics } from '@/entities/topic'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import Button from '@/shared/ui/Button/Button'
import { Progress } from '@/shared/ui/Progress/Progress'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useDisclosure } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { FaClock } from 'react-icons/fa6'
import { HiVideoCamera } from 'react-icons/hi'
import { LuListOrdered } from 'react-icons/lu'
import ModalComponent from '../ModalComponent/ModalComponent'
import cls from './topicPage.module.scss'

const TopicsPage = () => {
	const { courseId } = useParams<{ courseId: string }>()
	const { topicsAllData } = useGetAllTopics(courseId)
	const { courseData } = useGetCourse(courseId)
	const t = useTranslations('TopicsPage')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [selectedTopicId, setSelectedTopicId] = useState('')

	const handleTopicClick = topicId => {
		setSelectedTopicId(topicId)
		onOpen()
	}
	return (
		<DashboardLayout className={`w-full flex justify-center`}>
			<div className={'w-[800px] '}>
				<Text size={TextSize.XL} title={courseData?.name} />

				<div className={'flex flex-wrap gap-6 mt-5'}>
					{topicsAllData &&
						topicsAllData.map((topic, i) => (
							<div
								className={
									'w-[335px] h-[300px] shadow-xl bg-white rounded-xl p-4 flex flex-col justify-between'
								}
								key={i}
							>
								<div className={'flex justify-between '}>
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
								<div className={'flex gap-2 flex-wrap w-full mt-auto'}>
									<div className={'flex mr-4 items-center'}>
										<FaClock size={18} className={'text-gray-2 mx-2'} />
										<h3 className={'text-gray-2 font-normal'}>
											{`${topic.completionTime} Hours`}
										</h3>
									</div>
									<div className={'flex mr-4 items-center'}>
										<HiVideoCamera size={24} className={'text-gray-2 mx-2'} />
										<h3 className={'text-gray-2 font-normal'}>
											{t('Video lesson')}
										</h3>
									</div>
									<div className={'flex mr-4 items-center'}>
										<LuListOrdered size={18} className={'text-gray-2 mx-2'} />
										<h3 className={'text-gray-2 font-normal'}>
											{`${topic.totalSubtopics}  ${t('Topics')}`}
										</h3>
									</div>
								</div>
								<Progress
									color={'peach'}
									value={topic.progressPercents}
									className={'h-1 rounded-full mt-2'}
								></Progress>
							</div>
						))}
				</div>
			</div>
			{isOpen && <ModalComponent topicId={selectedTopicId} onClose={onClose} />}
		</DashboardLayout>
	)
}

export default TopicsPage
