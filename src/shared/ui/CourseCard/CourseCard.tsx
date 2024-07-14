import React from 'react'
import Button from '@/shared/ui/Button/Button'
import { getCourseByIdRoute } from '@/shared/const/router'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/navigation'
import cls from './CourseCard.module.scss'
import CourseStat from './CourseStat/CourseStat'
import { ICourse } from '@/entities/course'

const CourseCard = ({
	course,
	className,
	isSquare
}: {
	course: ICourse
	className?: string
	isSquare?: boolean
}) => {
	const styles = isSquare
		? 'w-[330px] h-min-[330px] h-auto max-md:w-full max-md:h-min-[252px] lg:w-[330px]'
		: 'w-[390px] h-min-[330px] h-auto max-md:w-full max-md:h-min-[252px] lg:w-1/2'
	return (
		<div
			className={`${styles} border-decor-1 border-1 rounded-[40px] p-4 ${className}`}
		>
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
	)
}

export default CourseCard
