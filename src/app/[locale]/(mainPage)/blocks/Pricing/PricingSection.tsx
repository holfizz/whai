import CheckIcon from '@/shared/assets/icons/CheckIcon'
import { getRouteSignUp } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const PricingSection = () => {
	const t = useTranslations('Subscription')
	const monthlyPrices = {
		BASIC: 799,
		STANDARD: 1299,
		PREMIUM: 2499
	}
	const subscriptionDetails = {
		BASIC: {
			title: t('Base subscription'),
			description: t('Base description'),
			benefits: [
				t('Courses per month', { count: 1 }),
				t('Course titles', { count: 15 }),
				t('Lessons per course', { count: 10 })
				// t('Analytics access')
			]
		},
		STANDARD: {
			title: t('Standard subscription'),
			description: t('Standard description'),
			benefits: [
				t('Courses per month', { count: 2 }),
				t('Course titles', { count: 20 }),
				t('Lessons per course', { count: 15 }),
				// t('Analytics access'),
				t('AI homework check')
			]
		},
		PREMIUM: {
			title: t('Premium subscription'),
			description: t('Premium description'),
			benefits: [
				t('Courses per month', { count: 5 }),
				t('Course titles', { count: 30 }),
				t('Lessons per course', { count: 20 }),
				// t('Analytics access', { count: 'visits, grades' }),
				t('AI homework check'),
				t('Document upload'),
				t('Image generation')
			]
		}
	}
	return (
		<div className='w-full h-auto mt-20 flex justify-start items-center flex-col mb-10'>
			<h1 className='text-3xl w-[80%] text-center'>
				Получите личный курс <b>ВСЕГО</b> ЗА 799р, с доступом{' '}
				<span className='text-decor-2'>навсегда</span>
			</h1>
			<p className='w-[45%] max-lg:w-[70%] max-640:w-[90%] text-center mt-4 text-sm text-secondary'>
				Специальное предложение: два полноценных курса всего за 2999 рублей.
				Получите неограниченный доступ к материалам и обучайтесь в удобное для
				вас время. Расширьте свои профессиональные горизонты прямо сейчас.
			</p>
			<div className='w-[80vw] max-xl:w-[95vw] flex flex-col items-center justify-center'>
				<div className='flex w-full items-center max-lg:items-start max-lg:overflow-x-auto justify-center max-lg:justify-start'>
					<div className='w-fit min-w-[950px] max-640:max-w-full max-640:min-w-full mt-10 grid grid-cols-3 gap-5 items-stretch max-640:flex max-640:flex-col max-640:w-[70vw] max-sm:w-[95vw] max-lg:overflow-x-auto max-640:items-center'>
						{['BASIC', 'STANDARD', 'PREMIUM'].map(
							(type: 'BASIC' | 'STANDARD' | 'PREMIUM') => (
								<div
									key={type}
									className={`w-[335px] max-1200:w-[300px] max-640:w-[50vw] max-500:w-[60vw] max-sm:w-[70vw] h-auto ${
										type === 'PREMIUM' ? 'bg-accent text-white' : 'bg-decor-1'
									} rounded-3xl overflow-hidden flex flex-col`}
								>
									<div className='flex flex-col justify-center p-5'>
										<h2 className='text-lg mb-4'>
											{subscriptionDetails[type].title}
										</h2>
										<div className='flex items-end gap-2'>
											<p
												className={`font-bold  ${
													type === 'PREMIUM' ? 'text-white' : 'text-accent'
												} text-5xl`}
											>
												{monthlyPrices[type]}
											</p>
											<span
												className={`text-3xl font-bold ${
													type === 'PREMIUM' ? 'text-gray-500' : 'text-yellow-5'
												}`}
											>
												₽
											</span>
										</div>
										<p
											className={` mb-6 mt-1 ${
												type === 'PREMIUM' ? 'text-gray-500' : 'text-yellow-5'
											}`}
										>
											{t('Discount notice')}
										</p>
										<p className='mb-4 h-[200px]'>
											{subscriptionDetails[type].description}
										</p>
										<ul className='mb-4 flex flex-col justify-center w-full'>
											{subscriptionDetails[type].benefits.map(
												(benefit, index) => (
													<li
														key={index}
														className='flex justify-start items-center w-full mt-4'
													>
														<CheckIcon className='mr-2 flex-shrink-0' />
														<span className='flex-grow leading-tight'>
															{benefit}
														</span>
													</li>
												)
											)}
										</ul>
									</div>
									<Button
										as={Link}
										href={getRouteSignUp()}
										color={'main'}
										variant='noneRound'
										disableAnimation
										className={`relative w-full rounded-none h-[70px] text-accent py-2 mt-auto max-640:h-[50px]`}
									>
										{t('Try for free')}
									</Button>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PricingSection
