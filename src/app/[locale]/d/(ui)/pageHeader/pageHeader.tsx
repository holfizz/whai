'use client'

import { IUser } from '@/entities/Auth'
import { ICourse, useGetAllCourses, useGetLastCourse } from '@/entities/course'
import { Link } from '@/navigation'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import EngAvatar from '@/shared/assets/image/EnglishCourseAvatar.png'
import UniverseImage from '@/shared/assets/image/UniversalLife.png'
import {
	getCourseByIdRoute,
	getCourseExampleByIdRoute
} from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import CourseStat from '@/shared/ui/CourseCard/CourseStat/CourseStat'
import { Progress } from '@/shared/ui/Progress/Progress'
import Text from '@/shared/ui/Text/Text'
import { WelcomeBack } from '@/widgets/WelcomeBack'
import { Skeleton } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ENGLISH_COURSE_A1_TO_B1 } from '../../(model)/static-course.data'
import PageBody from '../pageBody/pageBody'

export default function PageHeader({ userData }: { userData: IUser }) {
	const t = useTranslations('Dashboard')
	const { lastCourseData, loadingLastCourse } = useGetLastCourse()
	const { allCourseData, loadingAllCourse } = useGetAllCourses()
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
									'w-auto max-lg:w-[75vw] flex justify-between items-start  rounded-2xl p-2 max-md:flex-col max-sm:items-start flex-col '
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
												<Image src={UniverseImage} alt='recommendation' />
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
									<div className='flex max-sm:w-full'>
										<div className={'flex'}>
											<Link
												href={getCourseExampleByIdRoute(
													ENGLISH_COURSE_A1_TO_B1?.id
												)}
												className={
													'w-[70px] h-[70px] mr-4 flex justify-center items-center'
												}
											>
												<Image
													className={'scale-[2]'}
													src={EngAvatar}
													alt='recommendation'
												/>
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
															href={getCourseExampleByIdRoute(
																ENGLISH_COURSE_A1_TO_B1?.id
															)}
														>
															{ENGLISH_COURSE_A1_TO_B1?.name}
														</Link>
													)}
													<ProgressBar data={ENGLISH_COURSE_A1_TO_B1 as any} />
												</div>
												<CourseStat data={ENGLISH_COURSE_A1_TO_B1 as any} />
											</div>
										</div>
										<div className=''>
											<Button
												size={'mRound'}
												href={getCourseExampleByIdRoute(
													ENGLISH_COURSE_A1_TO_B1?.id
												)}
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
								)}
								<PageBody />
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
