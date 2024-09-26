'use client'

import { Link } from '@/navigation'
import { getSubscriptionsRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import './HeroSection.scss'
import PlatformExample from './PlatformExample.webp'

const HeroSection = () => {
	return (
		<div className='mt-[50px] flex flex-col items-center '>
			<div className='w-[80%] h-auto flex justify-center flex-col items-center relative'>
				<h1 className='text-[96px] max-md:text-[60px] max-640:text-[45px] max-sm:text-[37px] leading-none text-center z-10'>
					<span className='font-light'>
						Учись именно <br /> тому,{' '}
					</span>

					<i>
						<b className='font-medium'>что нужно</b>
					</i>
				</h1>
				<div className='w-[160px] h-[160px] rounded-3xl bg-decor-1 rotate-45 z-0 absolute left-[17vw] max-md:left-0 top-28 max-640:w-[120px] max-640:h-[120px]'></div>
				<div className='w-[107px] h-[107px] rounded-3xl bg-bg-accent rotate-[77deg] z-0 absolute left-[32vw] top-0 max-640:w-[88px] max-640:h-[88px]'></div>
				<div className='w-[200px] h-[200px] max-md:right-0 rounded-3xl bg-bg-accent rotate-[77deg] z-0 absolute right-[10vw] bottom-[-120px]  max-640:w-[150px] max-640:h-[150px]'></div>
				<p
					className={'text-secondary text-lg text-center font-light mt-8  z-10'}
				>
					Наш ИИ подберёт персонализированную программу, основанную <br />
					на актуальных данных и лучших практиках.
				</p>
				<div className='flex gap-5 mt-8'>
					<Button
						as={Link}
						href={getSubscriptionsRoute()}
						className='w-[200px] h-[70px] max-md:w-[120px] max-md:h-[40px] rounded-3xl bg-decor-2'
					>
						Подписаться
					</Button>
					<Button className='w-[200px] h-[70px] max-md:w-[120px] max-md:h-[40px] rounded-3xl bg-decor-4'>
						Демоверсия
					</Button>
				</div>
			</div>
			<div className='relative mt-24'>
				{/* Изображение */}
				<div className='w-full flex justify-center relative h-auto flex-col items-center'>
					<img
						src={PlatformExample.src}
						alt='Platform Example'
						className='PlatformExample'
					/>
					<div className='w-[60%] max-lg:w-[80%] h-auto bg-decor-4 p-[60px] rounded-[40px] z-10 mt-[-200px] max-md:p-[30px] max-640:hidden'>
						<div className='w-1/2 max-md:w-full'>
							<h1 className='font-medium text-2xl'>
								Что такое whai и что он может{' '}
							</h1>
							<p className='mt-4'>
								Платформа облегчает процесс создания учебных материалов для
								сотрудников и студентов за счет автоматизации задач, таких как
								разработка структуры курса, подбор иллюстраций, создание
								шаблонов и другие.
								<br />
								<br />
								Это позволяет существенно экономить время и ресурсы,
								предоставляя возможность создавать качественные материалы без
								необходимости обладать глубокими знаниями в этой области.
							</p>
						</div>
					</div>
				</div>

				{/* Контейнер с иконками под изображением */}
			</div>
		</div>
	)
}

export default HeroSection
