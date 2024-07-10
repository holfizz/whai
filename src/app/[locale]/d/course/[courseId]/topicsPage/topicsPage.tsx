'use client'
import { useGetAllTopics } from '@/entities/topic'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { useGetCourse } from '@/entities/course'
import { useParams } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import Button from '@/shared/ui/Button/Button'
import cls from './topicPage.module.scss'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { FaClipboardList, FaClock, FaThumbtack } from 'react-icons/fa6'
import { useTranslations } from 'next-intl'
import { PiShareFatFill } from 'react-icons/pi'
import { IoFlagSharp, IoVideocam } from 'react-icons/io5'
import { Progress } from '@/shared/ui/Progress/Progress'

const TopicsPage = () => {
	const { courseId } = useParams<{ courseId: string }>()
	const { topicsAllData } = useGetAllTopics(courseId)
	const { courseData } = useGetCourse(courseId)
	const t = useTranslations('TopicsPage')
	return (
		<DashboardLayout className={`w-full flex justify-center`}>
			<div className={'w-[800px] '}>
				<Text size={TextSize.XL} title={courseData?.name} />
				<div className={'flex gap-4'}>
					<Button
						startContent={
							<FaThumbtack size={18} color={'var(--color-decor-5)'} />
						}
						className={cls.actionButton}
					>
						<h3 className={'text-[var(--color-secondary)] text-lg'}>
							{t('In notes')}
						</h3>
					</Button>
					<Button
						startContent={
							<IoFlagSharp size={18} color={'var(--color-decor-5)'} />
						}
						className={cls.actionButton}
					>
						<h3 className={'text-[var(--color-secondary)] text-lg'}>
							{t('Report a bug')}
						</h3>
					</Button>
					<Button
						startContent={
							<PiShareFatFill size={18} color={'var(--color-decor-5)'} />
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
									<h1 className={cls.title}>{topic.name}</h1>
									<Button
										variant={'round'}
										size={'sRound'}
										startContent={<ArrowUpRight color={'#fff'} />}
									/>
								</div>
								<p className={cls.description}>{topic.description}</p>
								<div className={'flex gap-4 flex-wrap w-full'}>
									<div className={'flex gap-2 items-center'}>
										<FaClock size={18} className={'text-gray-300'} />
										<h3 className={'text-gray-300 font-medium'}>
											{`${topic.completionTime} Hours`}
										</h3>
									</div>
									<div className={'flex gap-2 items-center'}>
										<IoVideocam size={18} className={'text-gray-300'} />
										<h3 className={'text-gray-300 font-medium'}>
											{`${topic.completionTime}  ${t('Video lesson')}`}
										</h3>
									</div>
									<div className={'flex gap-2 items-center'}>
										<FaClipboardList size={18} className={'text-gray-300'} />
										<h3 className={'text-gray-300 font-medium'}>
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
		</DashboardLayout>
	)
}

export default TopicsPage
