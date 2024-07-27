'use client'
import { useGetCourse } from '@/entities/course'
import { useGetAllTopics } from '@/entities/topic'
import Button from '@/shared/ui/Button/Button'
import { Progress } from '@/shared/ui/Progress/Progress'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useDisclosure } from '@nextui-org/react'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { FaClipboardList, FaClock, FaThumbtack } from 'react-icons/fa6'
import { IoFlagSharp, IoVideocam } from 'react-icons/io5'
import { PiShareFatFill } from 'react-icons/pi'
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
				<div className={'flex gap-4'}>
					<Button
						startContent={
							<FaThumbtack size={18} color={'var(--color-decor-2)'} />
						}
						className={cls.actionButton}
					>
						<h3 className={'text-[var(--color-secondary)] text-lg'}>
							{t('In notes')}
						</h3>
					</Button>
					<Button
						startContent={
							<IoFlagSharp size={18} color={'var(--color-decor-2)'} />
						}
						className={cls.actionButton}
					>
						<h3 className={'text-[var(--color-secondary)] text-lg'}>
							{t('Report a bug')}
						</h3>
					</Button>
					<Button
						startContent={
							<PiShareFatFill size={18} color={'var(--color-decor-2)'} />
						}
						className={cls.actionButton}
					>
						<h3 className={'text-[var(--color-secondary)]'}>{t('Share')}</h3>
					</Button>
				</div>
				<div className={'flex flex-wrap gap-6 mt-10'}>
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
										startContent={<ArrowUpRight color={'#fff'} />}
										color={'accent'}
									/>
								</div>
								<p className={cls.description}>{topic.description}</p>
								<div className={'flex gap-2 flex-wrap w-full'}>
									<div className={'flex mr-4 items-center'}>
										<FaClock size={18} className={'text-gray-300 mx-2'} />
										<h3 className={'text-gray-300 font-normal'}>
											{`${topic.completionTime} Hours`}
										</h3>
									</div>
									<div className={'flex mr-4 items-center'}>
										<IoVideocam size={18} className={'text-gray-300 mx-2'} />
										<h3 className={'text-gray-300 font-normal'}>
											{`${topic.completionTime}  ${t('Video lesson')}`}
										</h3>
									</div>
									<div className={'flex mr-4 items-center'}>
										<FaClipboardList
											size={18}
											className={'text-gray-300 mx-2'}
										/>
										<h3 className={'text-gray-300 font-normal'}>
											{`${topic.totalSubtopics}  ${t('Topics')}`}
										</h3>
									</div>
								</div>
								<Progress
									color={'peach'}
									value={topic.progressPercents}
									className={'h-1 rounded-full mt-auto'}
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
