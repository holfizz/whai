'use client'

import Text, { TextSize } from '@/shared/ui/Text/Text'
import { useTranslations } from 'next-intl'
import cls from './pageHeader.module.scss'
import { Avatar, Skeleton } from '@nextui-org/react'
import { useGetLastCourse } from '@/entities/course/model/course.queries'
import { Progress } from '@/shared/ui/Progress/Progress'
import Icon from '@/shared/ui/Icon/Icon'
import { ArrowUpRight } from 'lucide-react'
import Button from '@/shared/ui/Button/Button'
import { TbBrain } from 'react-icons/tb'
import { Link } from '@/navigation'
import { getCourseByIdRoute } from '@/shared/const/router'
import { IUser } from '@/entities/Auth'
import { ICourse } from '@/entities/course'
import CourseStat from '@/app/[locale]/d/(ui)/CourseStat/CourseStat'

export default function PageHeader({ userData }: { userData: IUser }) {
	const t = useTranslations('Dashboard')
	const { lastCourseData, loadingLastCourse } = useGetLastCourse()
	return (
		<div>
			<Text title={t('Continue education')} className={'mb-5 max-lg:hidden'} />
			<div className={'flex justify-between '}>
				<div
					className={
						'flex w-full justify-between max-lg:items-center max-lg:flex-col-reverse'
					}
				>
					<div className={'mt-5'}>
						<Text
							title={t('Continue education')}
							className={'mb-5 lg:hidden'}
						/>
						<div>
							<div
								className={
									'w-[800px] max-lg:w-[80vw] flex justify-between items-center border-solid border-2 border-opacity-5  border-secondary rounded-2xl p-2 max-md:flex-col max-md:items-start'
								}
							>
								<div className={'flex'}>
									<div
										className={
											'w-[70px] h-[70px]  rounded-full bg-decor-8 mr-4 flex justify-center items-center'
										}
									>
										<Icon
											className={'stroke-[var(--color-white)]  text-3xl'}
											SVG={TbBrain}
										/>
									</div>

									<div>
										<div>
											{loadingLastCourse ? (
												<Skeleton className='h-3 w-3/5 rounded-lg' />
											) : (
												<Text
													className={'max-md:w-[50vw]'}
													size={TextSize.S}
													title={lastCourseData?.name}
												/>
											)}
											<ProgressBar
												data={lastCourseData}
												classNames={'max-md:hidden'}
											/>
										</div>
										<CourseStat
											className={'max-md:hidden '}
											data={lastCourseData}
										/>
									</div>
								</div>
								<div className={'w-[-webkit-fill-available]'}>
									<ProgressBar
										data={lastCourseData}
										classNames={'md:hidden max-md:flex w-full'}
									/>
									<CourseStat
										data={lastCourseData}
										className={'md:hidden max-md:flex max-md:w-[95%]'}
									/>

									<Button
										size={'mRound'}
										href={getCourseByIdRoute(lastCourseData?.id)}
										isIconOnly
										startContent={<ArrowUpRight color={'#fff'} />}
										variant={'round'}
										as={Link}
										className={'max-md:hidden'}
									></Button>
								</div>
							</div>
						</div>
					</div>
					<div className={cls.welcomeBlocks}>
						<div className={cls.personWelcomeBlock}>
							<Avatar
								className={cls.avatar}
								src={userData?.avatarPath}
								alt='Avatar'
							/>
							<div className={cls.welcomeBlcTitle}>
								<Text title={`${t('Welcome back')},`} />
								<Text title={`${userData?.firstName}!`} />
								<Text text={`Давайте продолжим изучать работу с Whai`} />
								<h1
									className={
										'text-[var(--color-decor-5)] font-semibold text-2xl'
									}
								>
									{t("Let's begin! (1/4)")}
								</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
const ProgressBar = ({
	data,
	classNames
}: {
	data: ICourse
	classNames?: string
}) => {
	return (
		<Progress
			className={`w-[390px] h-[2px] mt-4 rounded-xl ${classNames}`}
			color='peach'
			value={data?.progressPercents}
			size={'sm'}
		/>
	)
}
