'use client'

import { IUser } from '@/entities/Auth'
import { ICourse, useGetLastCourse } from '@/entities/course'
import { Link } from '@/navigation'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import MathAvatar from '@/shared/assets/image/MathCourseAvatar.png'
import { getCourseByIdRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import CourseStat from '@/shared/ui/CourseCard/CourseStat/CourseStat'
import { Progress } from '@/shared/ui/Progress/Progress'
import Text, { TextTheme } from '@/shared/ui/Text/Text'
import { WelcomeBack } from '@/widgets/WelcomeBack'
import { Skeleton } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

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
									'w-auto max-lg:w-[75vw] flex justify-between items-center border-solid border-2 border-opacity-5  border-secondary rounded-2xl p-2 max-md:flex-col max-sm:items-start'
								}
							>
								{lastCourseData ? (
									<div className='flex max-sm:w-full'>
										<div className={'flex'}>
											<Link
												href={getCourseByIdRoute(lastCourseData?.id)}
												className={
													'w-[70px] h-[70px] mr-4 flex justify-center items-center'
												}
											>
												<Image src={MathAvatar} alt='recommendation' />
											</Link>

											<div className='w-full'>
												<div className='w-min max-md:w-full'>
													{loadingLastCourse ? (
														<Skeleton className='h-3 max-sm:w-full rounded-lg' />
													) : (
														<Link
															className={
																'font-medium text-xl w-2/3 line-clamp-2 text-ellipsis max-sm:w-full '
															}
															href={getCourseByIdRoute(lastCourseData?.id)}
														>
															{lastCourseData?.name}
														</Link>
													)}
													<ProgressBar data={lastCourseData} />
												</div>
												<CourseStat data={lastCourseData} />
											</div>
										</div>
										<div className=''>
											<Button
												size={'mRound'}
												href={getCourseByIdRoute(lastCourseData?.id)}
												isIconOnly
												startContent={<ArrowUpRight fill={'#fff'} />}
												variant={'circle'}
												as={Link}
												color={'accent'}
												className={
													'max-sm:hidden max-md:w-[50px] max-md:h-[50px] ml-8'
												}
											></Button>
										</div>
									</div>
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
			className={`w-[390px] h-1 mt-4 rounded-xl max-md:w-full ${classNames}`}
			color='peach'
			value={data?.progressPercents}
			size={'sm'}
		/>
	)
}
