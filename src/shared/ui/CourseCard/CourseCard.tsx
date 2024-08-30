import { ICourse } from '@/entities/course'
import { Link } from '@/navigation'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import UniverseImage from '@/shared/assets/image/UniversalLife.png'
import {
	getCourseByIdRoute,
	getCourseExampleByIdRoute
} from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'
import cls from './CourseCard.module.scss'
import CourseStat from './CourseStat/CourseStat'
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
		? ' h-min-[330px] h-auto md:w-[90%] max-md:h-min-[252px] lg:w-[390px] max-sm:w-full'
		: 'w-[390px] h-min-[330px] h-auto max-md:w-full max-md:h-min-[252px] lg:w-1/2 max-sm:w-full'
	const getRoute = (id: string) => {
		if (course?.isStatic) {
			return getCourseExampleByIdRoute(id)
		}
		return getCourseByIdRoute(id)
	}
	return (
		<div
			className={`${styles} shadow-sm rounded-[40px] py-4 px-5 ${className}  `}
		>
			<div className={'w-full flex justify-between'}>
				{course.imgUrl ? (
					<Link href={getRoute(course?.id)}>
						<Image
							width={24}
							height={24}
							className='sm:h-20 sm:w-20 rounded-lg bg-gray-100'
							src={`${process.env.SERVER_URL}${course.imgUrl}`}
							alt={course.name}
						/>
					</Link>
				) : (
					<Link href={getRoute(course?.id)}>
						<Image
							className='sm:h-20 sm:w-20 rounded-lg max-w-[150px]'
							src={UniverseImage}
							alt={course.name}
						/>
					</Link>
				)}
				<Button
					size={'sRound'}
					href={getRoute(course?.id)}
					isIconOnly
					startContent={<ArrowUpRight fill={'var(--color-accents)'} />}
					variant={'circle'}
					as={Link}
					color={'main'}
				></Button>
			</div>
			<Link className={cls.link} href={getRoute(course?.id)}>
				{course?.name}
			</Link>
			<p className={cls.paragraph}>{course?.description}</p>
			<CourseStat data={course} className={' w-[95%]'} />
		</div>
	)
}

export default CourseCard
