'use client'
import { IUser } from '@/entities/Auth'
import { GET_PROFILE } from '@/entities/Auth/model/auth.queries'
import { useMakePaymentMutation } from '@/entities/transaction/model/transaction.queries'
import { useRouter } from '@/navigation'
import CheckIcon from '@/shared/assets/icons/CheckIcon'
import { getRouteSubscriptionTerm } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Layout } from '@/widgets/Layout'
import { useQuery } from '@apollo/client'
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Switch
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import './Subs.scss'
const SubsPage = () => {
	const t = useTranslations('Subscription')
	const [isYear, setIsYear] = useState(false)
	const [isAutoRenewal, setIsAutoRenewal] = useState(false)
	const [activeModal, setActiveModal] = useState<
		'BASIC' | 'STANDARD' | 'PREMIUM' | null
	>(null)
	const { data: user } = useQuery<{ getProfile: IUser }>(GET_PROFILE)
	const { makePaymentData, makePaymentMutation } = useMakePaymentMutation()
	const router = useRouter()

	const monthlyPrices = {
		BASIC: 2999,
		STANDARD: 3999,
		PREMIUM: 4999
	}

	const discountedPrices = {
		BASIC: (monthlyPrices.BASIC * 0.8).toFixed(2),
		STANDARD: (monthlyPrices.STANDARD * 0.8).toFixed(2),
		PREMIUM: (monthlyPrices.PREMIUM * 0.8).toFixed(2)
	}

	const openModal = (type: 'BASIC' | 'STANDARD' | 'PREMIUM') => {
		setActiveModal(type)
	}

	const closeModal = () => {
		setActiveModal(null)
	}

	const subscriptionDetails = {
		BASIC: {
			title: t('Base subscription'),
			description: t('Base description'),
			benefits: [
				t('Courses per month', { count: 2 }),
				t('Course titles', { count: 20 }),
				t('Lessons per course', { count: 10 }),
				t('Analytics access')
			]
		},
		STANDARD: {
			title: t('Standard subscription'),
			description: t('Standard description'),
			benefits: [
				t('Courses per month', { count: 5 }),
				t('Course titles', { count: 30 }),
				t('Lessons per course', { count: 10 }),
				t('Analytics access'),
				t('AI homework check')
			]
		},
		PREMIUM: {
			title: t('Premium subscription'),
			description: t('Premium description'),
			benefits: [
				t('Courses per month', { count: 10 }),
				t('Course titles', { count: 50 }),
				t('Lessons per course', { count: 30 }),
				t('Analytics access', { count: 'visits, grades' }),
				t('AI homework check'),
				t('Document upload'),
				t('Image generation')
			]
		}
	}
	const formatDate = (timestamp: number | string | undefined) => {
		if (timestamp === undefined || timestamp === null) return ''

		// Преобразуем значение в число, если оно является строкой
		const timestampNumber =
			typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp

		// Проверяем, что преобразование прошло успешно
		if (isNaN(timestampNumber)) return ''

		// Преобразуем timestamp в объект Date
		const date = new Date(timestampNumber)

		// Извлекаем день, месяц и год
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы в JavaScript начинаются с 0
		const year = date.getFullYear()

		// Возвращаем отформатированную дату
		return `${day}.${month}.${year}`
	}

	useEffect(() => {
		if (makePaymentData) {
			window.open(makePaymentData.paymentUrl, '_blank')
		}
	}, [makePaymentData, router])

	return (
		<Layout>
			<div className='w-full h-auto mt-20 flex justify-start items-center flex-col mb-10'>
				<div className='w-[80vw] max-xl:w-[95vw] flex flex-col items-center justify-center'>
					{user?.getProfile?.activeSubscription?.isActive && (
						<>
							<h1 className='text-xl font-medium text-center'>
								{t('Your current subscription')}
								{': '}
								<h2
									className={`text-2xl font-bold text-decor-2 t ${
										user?.getProfile?.activeSubscription?.type === 'PREMIUM'
											? 'gradient-text-premium'
											: 'gradient-text-standard'
									}`}
								>
									{t(user?.getProfile?.activeSubscription?.type as any)}
								</h2>
							</h1>
							<h1 className='text-xl font-medium text-center flex items-center my-4'>
								{t('Subscription end date')}
								{': '}
								<h2 className='text-2xl font-bold text-decor-2 ml-2'>
									{formatDate(user?.getProfile?.activeSubscription?.endedAt)}
								</h2>
							</h1>
						</>
					)}

					<div className='mt-5'>
						<div className='flex items-center gap-4 mt-4'>
							<h2
								className={`text-sm ${
									isYear ? 'text-secondary' : 'text-accent'
								}`}
							>
								{t('Monthly')}
							</h2>
							<Switch
								classNames={{
									wrapper: 'group-data-[selected=true]:bg-decor-2'
								}}
								isSelected={isYear}
								onValueChange={val => setIsYear(val)}
							/>
							<h2
								className={`text-sm ${
									isYear ? 'text-accent' : 'text-secondary'
								}`}
							>
								{t('Annual')}
							</h2>
						</div>
					</div>
					<div className='w-full mt-10 grid grid-cols-3 gap-5 items-stretch max-md:flex max-md:flex-col max-md:w-[60vw] max-640:w-[70vw] max-sm:w-[95vw]'>
						{['BASIC', 'STANDARD', 'PREMIUM'].map(
							(type: 'BASIC' | 'STANDARD' | 'PREMIUM') => (
								<div
									key={type}
									className={`w-full h-auto ${
										type === 'PREMIUM' ? 'bg-accent text-white' : 'bg-decor-1'
									} rounded-3xl overflow-hidden flex flex-col`}
								>
									<div className='flex flex-col justify-center p-10'>
										<h2 className='text-2xl font-bold mb-4'>
											{subscriptionDetails[type].title}
										</h2>
										<p
											className={`text-5xl font-bold mb-2 ${
												isYear
													? 'text-secondary font-medium line-through '
													: type === 'PREMIUM'
													? 'text-white'
													: 'text-accent'
											}`}
										>
											{monthlyPrices[type]}
											<span className='text-3xl ml-2 text-secondary'>₽</span>
										</p>
										{isYear && (
											<p
												className={`text-2xl font-semibold mb-2 ${
													type === 'PREMIUM' ? 'text-white' : 'text-accent'
												} `}
											>
												{`${discountedPrices[type]} ₽`}
											</p>
										)}
										<p className='text-sm text-gray-500 mb-6'>
											{t('Discount notice')}
										</p>
										<p className='mb-4'>
											{subscriptionDetails[type].description}
										</p>
										<ul className='mb-4 flex flex-col justify-center w-full'>
											{subscriptionDetails[type].benefits.map(
												(benefit, index) => (
													<li
														key={index}
														className='flex justify-start items-start w-full mt-4'
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
										disabled={user?.getProfile?.activeSubscription?.isActive}
										onClick={() => {
											if (user) {
												openModal(type)
											} else {
												router.replace('/auth/login')
											}
										}}
										color={'main'}
										variant='noneRound'
										disableAnimation
										className={`relative w-full rounded-none h-[70px] text-accent py-2 mt-auto ${
											user?.getProfile?.activeSubscription?.isActive
												? 'cursor-not-allowed'
												: ''
										}`}
									>
										{t('Subscribe')}
										{user?.getProfile?.activeSubscription?.isActive && (
											<span className='absolute inset-0 bg-white bg-opacity-50 rounded-none'></span>
										)}
									</Button>
								</div>
							)
						)}
					</div>
				</div>
			</div>

			{['BASIC', 'STANDARD', 'PREMIUM'].map(
				(type: 'BASIC' | 'STANDARD' | 'PREMIUM') => (
					<Modal
						color='white'
						key={type}
						isOpen={activeModal === type}
						onOpenChange={closeModal}
					>
						<ModalContent>
							{onClose => (
								<>
									<ModalHeader className='flex flex-col gap-1'>
										{subscriptionDetails[type].title}
									</ModalHeader>
									<ModalBody>
										<p>{subscriptionDetails[type].description}</p>
										<p>
											<a
												href={getRouteSubscriptionTerm()}
												className='text-secondary'
											>
												{t('Read subscription terms')}
											</a>
										</p>
										<div className='mt-4 flex items-center justify-start'>
											<Switch
												classNames={{
													wrapper: 'group-data-[selected=true]:bg-decor-2'
												}}
												isSelected={isAutoRenewal}
												onClick={() => setIsAutoRenewal(prev => !prev)}
											/>
											<label>{t('Enable auto-renewal')}</label>
										</div>
									</ModalBody>
									<ModalFooter>
										<Button
											size='xl'
											className='rounded-3xl w-[auto]'
											color='primary'
											onPress={() => {
												makePaymentMutation({
													variables: {
														dto: {
															months: isYear ? 12 : 1,
															subscriptionType: activeModal,
															isAutoRenewal: isAutoRenewal
														}
													}
												})
											}}
										>
											{t('Continue checkout')}
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				)
			)}
		</Layout>
	)
}

export default SubsPage
