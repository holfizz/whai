'use client'

import ListAndPenIcon from '@/shared/assets/icons/ListAndPen'
import PracticeIcon from '@/shared/assets/icons/Practice'
import TimeManagementIcon from '@/shared/assets/icons/TimeManagement'
import './HeroSection.scss'
import PlatformExample from './PlatformExample.webp'

const HeroSection = () => {
	return (
		<div className='mt-[50px]'>
			<div className='w-full h-auto flex justify-center'>
				<h1 className='text-[96px] max-md:text-[60px] max-640:text-[45px] max-sm:text-[37px] leading-none text-center'>
					<span className='font-light'>
						Учись именно <br /> тому,{' '}
					</span>

					<i>
						<b className='font-medium'>что нужно</b>
					</i>
				</h1>
			</div>
			<div className='relative mt-24'>
				{/* Изображение */}
				<div className='w-full flex justify-center'>
					<img
						src={PlatformExample.src}
						alt='Platform Example'
						className='PlatformExample'
					/>
				</div>

				{/* Контейнер с иконками под изображением */}
				<div className='flex-container'>
					<div className='relative w-[280px] h-[260px] rounded-3xl bg-decor-4 p-4 max-md:flex-row max-md:flex max-md:h-[170px] max-md:w-[70%] max-sm:flex-col max-sm:h-auto max-sm:items-center'>
						<div className='max-md:w-1/2 max-sm:w-full'>
							<h1 className='font-semibold text-lg max-md:text-2xl'>
								Занятия в любое время
							</h1>
							<p className='text-base mt-4 max-md:text-xl'>
								Без расписаний и жёстких дедлайнов
							</p>
						</div>
						<ListAndPenIcon className='w-[180px] h-[180px] absolute right-[0px] bottom-[-20px] max-md:relative max-md:right-0 max-md:bottom-0 ' />
					</div>

					<div className='relative w-[280px] h-[260px] rounded-3xl bg-decor-4 p-4 max-md:flex-row max-md:flex max-md:h-[170px] max-md:w-[70%] max-sm:flex-col max-sm:h-auto max-sm:items-center'>
						<div className='max-md:w-1/2 max-sm:w-full'>
							<h1 className='font-semibold text-lg max-md:text-2xl'>
								Всегда и везде
							</h1>
							<p className='text-base mt-4 max-md:text-xl'>
								Доступ к материалам 24/7, где бы ты ни находился
							</p>
						</div>
						<TimeManagementIcon className='w-[180px] h-[180px] absolute right-[0px] bottom-[-20px] max-md:relative max-md:right-0 max-md:bottom-0 ' />
					</div>

					<div className='relative w-[280px] h-[260px] rounded-3xl bg-decor-4 p-4 max-md:flex-row max-md:flex max-md:h-[170px] max-md:w-[70%] max-sm:flex-col max-sm:h-auto max-sm:items-center'>
						<div className='max-md:w-1/2 max-sm:w-full'>
							<h1 className='font-semibold text-lg max-md:text-2xl'>
								Ускоренное обучение
							</h1>
							<p className='text-base mt-4 max-md:text-xl'>
								Решайте задачи, видите результат.
							</p>
						</div>
						<PracticeIcon className='w-[180px] h-[180px] absolute right-[0px] bottom-[-20px] max-md:relative max-md:right-0 max-md:bottom-0 ' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeroSection
