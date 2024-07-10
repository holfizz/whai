'use client'

import { ICourse } from '@/entities/course'
import { Skeleton } from '@nextui-org/react'
import Button from '@/shared/ui/Button/Button'
import { ArrowUpRight } from 'lucide-react'
import { getCourseByIdRoute } from '@/shared/const/router'
import { Link } from '@/navigation'
import cls from './bodyCards.module.scss'
import { useTranslations } from 'next-intl'
import CourseStat from '@/app/[locale]/d/(ui)/CourseStat/CourseStat'

export default function BodyCards({
	data,
	loading
}: {
	data: ICourse[]
	loading: boolean
}) {
	if (loading) {
		return (
			<div className={'flex gap-5'}>
				<Skeleton className='w-[390px] h-[330px] md:w-[353px] md:h-[252px] rounded-lg'></Skeleton>
				<Skeleton className='w-[390px] h-[330px] md:w-[353px] md:h-[252px] rounded-lg'></Skeleton>
			</div>
		)
	}
	const filteredCourses = data.slice(1, 3)
	const t = useTranslations('Dashboard')
	return (
		<div className={'flex justify-between max-md:flex-wrap gap-4'}>
			{filteredCourses &&
				filteredCourses.map((course, i) => (
					<div className='w-[390px] h-min-[330px] h-auto max-md:w-full max-md:h-min-[252px] lg:w-1/2 border-decor-1 border-1 rounded-[40px] p-4'>
						<div className={'w-full flex justify-between'}>
							<div className='w-24 h-24 sm:h-20 sm:w-20 rounded-lg bg-gray-100'></div>
							<Button
								size={'sRound'}
								href={getCourseByIdRoute(course?.id)}
								isIconOnly
								startContent={<ArrowUpRight color={'#fff'} />}
								variant={'round'}
								as={Link}
							></Button>
						</div>
						<Link className={cls.link} href={getCourseByIdRoute(course?.id)}>
							{course?.name}
						</Link>
						<p className={cls.paragraph}>{course?.description}</p>
						<CourseStat data={course} className={'max-md:w-[95%]'} />
					</div>
				))}
		</div>
	)
}
