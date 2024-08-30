'use client'

import BodyCards from '@/app/[locale]/d/(ui)/pageBody/bodyCard/bodyCards'
import { useGetAllCourses } from '@/entities/course/'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import HandsImage from '@/shared/assets/image/Hands.png'
import { getCoursesRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import Text from '@/shared/ui/Text/Text'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function PageBody() {
	const t = useTranslations('Dashboard')
	const { allCourseData, loadingAllCourse } = useGetAllCourses()
	return (
		<div className='w-full max-lg:w-[80vw] mt-32 max-640:w-full'>
			<div className='flex justify-between'>
				<Text title={t('Recommendations')} className={'mb-5'} />
				<Button
					color={'clear'}
					className={'text-[var(--secondary-color)]'}
					endContent={<ArrowUpRight fill='#fff' />}
					as={Link}
					href={getCoursesRoute()}
				>
					{t('View all')}
				</Button>
			</div>
			<BodyCards
				className={'mt-8'}
				data={allCourseData}
				loading={loadingAllCourse}
			/>
			<div className='w-full bg-decor-1 rounded-3xl flex flex-row justify-between mt-16 max-sm:flex-col-reverse'>
				<div className='w-full p-4 max-640:w-full max-640:flex  max-640:items-start max-640:flex-col'>
					<h2 className='text-yellow-5 text-lg max-640:text-2xl'>
						Проверь себя
					</h2>
					<h1 className='text-yellow-10 text-lg max-640:text-2xl font-bold'>
						Не знаете, с чего начать?
					</h1>
					<p className='text-yellow-5 text-sm max-640:text-lg mt-4'>
						Предварительные выводы неутешительны: новая модель организационной
						деятельности однозначно определяет каждого ...
					</p>
				</div>
				<div className='w-auto flex justify-end overflow-hidden max-640:justify-center'>
					<Image
						width={222}
						height={231}
						className='max-640:h-[150px] max-640:w-[revert-layer]'
						src={HandsImage}
						alt='hands'
					/>
				</div>
			</div>
		</div>
	)
}
