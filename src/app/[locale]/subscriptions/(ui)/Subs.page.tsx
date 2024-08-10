'use client'
import CheckIcon from '@/shared/assets/icons/CheckIcon'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { Switch } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const SubsPage = () => {
	const t = useTranslations('Subscription')
	const [isSelected, setIsSelected] = useState(true)

	const monthlyPrices = {
		base: 2999,
		standard: 5999,
		premium: 7999
	}

	const discountedPrices = {
		base: (monthlyPrices.base * 0.8).toFixed(2),
		standard: (monthlyPrices.standard * 0.8).toFixed(2),
		premium: (monthlyPrices.premium * 0.8).toFixed(2)
	}

	return (
		<DashboardLayout className='w-full'>
			<div
				style={{ height: 'calc(100vh - var(--navbar-height))' }}
				className='w-full mt-20 flex justify-start items-center flex-col'
			>
				<div>
					<h1 className='text-xl font-medium'>{t('Subscription price')}</h1>
					<div className='flex items-center gap-4 mt-4'>
						<h2
							className={`text-sm ${
								isSelected ? 'text-secondary' : 'text-accent'
							}`}
						>
							{t('Monthly')}
						</h2>
						<Switch
							classNames={{
								wrapper: 'group-data-[selected=true]:bg-decor-2'
							}}
							isSelected={isSelected}
							onValueChange={setIsSelected}
						/>
						<h2
							className={`text-sm ${
								isSelected ? 'text-accent' : 'text-secondary'
							}`}
						>
							{t('Annual')}
						</h2>
					</div>
				</div>
				<div className='w-full mt-10 grid grid-cols-3 gap-5 items-stretch'>
					<div className='w-full h-auto bg-decor-1 rounded-3xl overflow-hidden flex flex-col'>
						<div className='flex flex-col justify-center p-10'>
							<h2 className='text-2xl font-bold mb-4'>
								{t('Base subscription')}
							</h2>
							<p
								className={`text-5xl font-bold mb-2 ${
									isSelected
										? 'text-secondary font-medium line-through '
										: 'text-accent'
								}`}
							>
								{monthlyPrices.base}
								<span className='text-3xl ml-2 text-secondary'>₽</span>
							</p>
							{isSelected && (
								<p className='text-2xl font-semibold mb-2 text-accent'>
									{`${discountedPrices.base} ₽`}
								</p>
							)}
							<p className='text-sm text-gray-500 mb-6'>
								{t('Discount notice')}
							</p>
							<p className='mb-4'>{t('Base description')}</p>
							<ul className='mb-4 flex flex-col justify-center w-full'>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Courses per month', { count: 2 })}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Course titles', { count: 20 })}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Lessons per course', { count: 10 })}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Analytics access')}
									</span>
								</li>
							</ul>
						</div>
						<Button
							color={'main'}
							variant='noneRound'
							disableAnimation
							className='w-full rounded-none h-[70px] text-accents py-2 mt-auto'
						>
							{t('Subscribe')}
						</Button>
					</div>

					<div className='w-full h-auto bg-decor-1 rounded-3xl overflow-hidden flex flex-col'>
						<div className='flex flex-col justify-center p-10'>
							<h2 className='text-2xl font-bold mb-4'>
								{t('Standard subscription')}
							</h2>
							<p
								className={`text-5xl font-bold mb-2 ${
									isSelected
										? 'text-secondary font-medium line-through '
										: 'text-accent'
								}`}
							>
								{monthlyPrices.standard}
								<span className='text-3xl ml-2 text-secondary'>₽</span>
							</p>
							{isSelected && (
								<p className='text-2xl font-semibold mb-2 text-accent'>
									{`${discountedPrices.standard} ₽`}
								</p>
							)}
							<p className='text-sm text-gray-500 mb-6'>
								{t('Discount notice')}
							</p>
							<p className='mb-4'>{t('Standard description')}</p>
							<ul className='mb-4 flex flex-col justify-center w-full'>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Courses per month', { count: 5 })}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Course titles', { count: 30 })}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Lessons per course', { count: 10 })}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Analytics access')}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('AI homework check')}
									</span>
								</li>
							</ul>
						</div>
						<Button
							color={'main'}
							variant='noneRound'
							disableAnimation
							className='w-full rounded-none h-[70px] text-accents py-2 mt-auto'
						>
							{t('Subscribe')}
						</Button>
					</div>

					<div className='w-full h-auto bg-accent rounded-3xl overflow-hidden text-white flex flex-col'>
						<div className='flex flex-col justify-center p-10'>
							<h2 className='text-2xl font-bold mb-4'>
								{t('Premium subscription')}
							</h2>
							<p
								className={`text-5xl font-bold mb-2 ${
									isSelected
										? 'text-secondary font-medium line-through '
										: 'text-white'
								}`}
							>
								{monthlyPrices.premium}{' '}
								<span className='text-3xl ml-2 text-secondary'>₽</span>
							</p>
							{isSelected && (
								<p className='text-2xl font-semibold mb-2 text-white'>
									{`${discountedPrices.premium} ₽`}
								</p>
							)}
							<p className='text-sm text-gray-500 mb-6'>
								{t('Discount notice')}
							</p>
							<p className='mb-4'>{t('Premium description')}</p>
							<ul className='mb-4 flex flex-col justify-center w-full'>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Courses per month', { count: 10 })}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Course titles', { count: 50 })}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Lessons per course', { count: 30 })}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Analytics access')} (visits, grades)
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('AI homework check')}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Document upload')}
									</span>
								</li>
								<li className='flex justify-start items-start w-full mt-8'>
									<CheckIcon className='mr-2 flex-shrink-0' />
									<span className='flex-grow leading-tight'>
										{t('Image generation')}
									</span>
								</li>
							</ul>
						</div>
						<Button
							color={'main'}
							variant='noneRound'
							disableAnimation
							className='w-full rounded-none h-[70px] text-accent py-2 mt-auto relative'
						>
							{t('Subscribe')}
						</Button>
					</div>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default SubsPage
