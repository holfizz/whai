'use client'

import { IUser } from '@/entities/Auth'
import { ICourse, useGetLastCourse } from '@/entities/course'
import { Link } from '@/navigation'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import { getCourseByIdRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import CourseStat from '@/shared/ui/CourseCard/CourseStat/CourseStat'
import Icon from '@/shared/ui/Icon/Icon'
import { Progress } from '@/shared/ui/Progress/Progress'
import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { WelcomeBack } from '@/widgets/WelcomeBack'
import { Skeleton } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { TbBrain } from 'react-icons/tb'

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
								{lastCourseData ? (
									<>
										<div className={'flex'}>
											<div
												className={
													'w-[70px] h-[70px]  rounded-full bg-decor-2 mr-4 flex justify-center items-center'
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
										<div>
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
												startContent={<ArrowUpRight fill={'#fff'} />}
												variant={'circle'}
												as={Link}
												color={'accent'}
												className={'max-md:hidden'}
											></Button>
										</div>
									</>
								) : (
									<Text
										theme={TextTheme.ERROR}
										title={t('Course not found')}
									></Text>
								)}
							</div>
						</div>
					</div>
					<WelcomeBack userData={userData} />
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
			className={`w-[390px] h-1 mt-4 rounded-xl ${classNames}`}
			color='peach'
			value={data?.progressPercents}
			size={'sm'}
		/>
	)
}
