'use client'
import { IUser } from '@/entities/Auth'
import {
	ACTIVATE_TRIAL_SUBSCRIPTION,
	GET_PROFILE,
	UPDATE_PROFILE
} from '@/entities/Auth/model/auth.queries'
import { useMakePaymentMutation } from '@/entities/transaction/model/transaction.queries'
import { Link, useRouter } from '@/navigation'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import CheckIcon from '@/shared/assets/icons/CheckIcon'
import {
	getRouteContacts,
	getRouteSubscriptionTerm
} from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Layout } from '@/widgets/Layout'
import { useMutation, useQuery } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Switch
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

const SubsPage = () => {
	const t = useTranslations('Subscription')
	const [isYear, setIsYear] = useState(false)
	const [activeModal, setActiveModal] = useState<
		'BASIC' | 'STANDARD' | 'PREMIUM' | null
	>(null)
	const [showConfirmModal, setShowConfirmModal] = useState(false)
	const { data: user } = useQuery<{ getProfile: IUser }>(GET_PROFILE)
	const { makePaymentData, makePaymentMutation } = useMakePaymentMutation()
	const [updateProfile] = useMutation(UPDATE_PROFILE)
	const router = useRouter()
	const [isAutoRenewal, setIsAutoRenewal] = useState<boolean>(false)
	const [isAutoRenewalModal, setIsAutoRenewalModal] = useState<boolean>(false)
	const [isTrialModalOpen, setTrialModalOpen] = useState(false)
	const [activateTrialSubscription] = useMutation(ACTIVATE_TRIAL_SUBSCRIPTION)
	const handleTrialActivation = async () => {
		try {
			await activateTrialSubscription()
			setTrialModalOpen(false)
			window.location.reload()
		} catch (error) {
			console.error('Error activating trial subscription:', error)
		}
	}
	useEffect(() => {
		if (makePaymentData) {
			window.open(makePaymentData.paymentUrl, '_blank')
		}
	}, [makePaymentData, router])
	useEffect(() => {
		if (user?.getProfile?.isAutoRenewal !== undefined) {
			setIsAutoRenewal(user.getProfile.isAutoRenewal)
		}
	}, [user?.getProfile?.isAutoRenewal])
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

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)

		if (isNaN(date.getTime())) {
			return ''
		}

		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()

		return `${day}.${month}.${year}`
	}

	const handleAutoRenewalToggleModal = async () => {
		setIsAutoRenewalModal(prev => !prev)
	}

	const confirmAutoRenewalChange = async () => {
		setShowConfirmModal(false)
		try {
			await updateProfile({
				variables: {
					id: user?.getProfile?.id,
					dto: {
						isAutoRenewal: !isAutoRenewal
					}
				}
			})
			setIsAutoRenewal(prev => !prev)
		} catch (error) {
			console.error('Failed to update profile:', error)
		}
	}

	const confirmCancelSubscribe = async () => {
		try {
			await updateProfile({
				variables: {
					id: user?.getProfile?.id,
					dto: {
						isAutoRenewal: false
					}
				}
			})
			setIsAutoRenewal(prev => !prev)
		} catch (error) {
			console.error('Failed to update profile:', error)
		}
	}

	const cancelAutoRenewalChange = () => {
		setShowConfirmModal(false)
	}

	return (
		<Layout>
			<div className='w-full h-auto mt-20 flex justify-start items-center flex-col mb-10'>
				<div className='w-[80vw] max-xl:w-[95vw] flex flex-col items-center justify-center'>
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
					<div className='flex w-full items-center max-lg:items-start max-lg:overflow-x-auto justify-center max-lg:justify-start'>
						<div className='w-fit min-w-[950px] max-640:max-w-full  max-640:min-w-full mt-10 grid grid-cols-3 gap-5 items-stretch max-640:flex max-640:flex-col max-640:w-[70vw] max-sm:w-[95vw] max-lg:overflow-x-auto max-640:items-center'>
							{['BASIC', 'STANDARD', 'PREMIUM'].map(
								(type: 'BASIC' | 'STANDARD' | 'PREMIUM') => (
									<div
										key={type}
										className={`w-[335px] max-1200:w-[300px] max-640:w-[50vw]   max-500:w-[60vw] max-sm:w-[80vw] h-auto ${
											type === 'PREMIUM' ? 'bg-accent text-white' : 'bg-decor-1'
										} rounded-3xl overflow-hidden flex flex-col`}
									>
										<div className='flex flex-col justify-center p-5'>
											<h2 className='text-lg mb-4'>
												{subscriptionDetails[type].title}
											</h2>
											<div className='flex items-end gap-2'>
												<p
													className={` font-bold ${
														isYear && type === 'PREMIUM'
															? 'text-gray-500 font-medium line-through text-3xl'
															: isYear
															? 'text-yellow-5 font-medium line-through text-3xl'
															: type === 'PREMIUM'
															? 'text-white text-5xl'
															: 'text-accent text-5xl'
													}`}
												>
													{isYear
														? `${Math.round(Number(monthlyPrices[type]) * 12)} `
														: `${monthlyPrices[type]} `}
												</p>
												{isYear && (
													<p
														className={`text-5xl flex items-end font-semibold   ${
															type === 'PREMIUM' ? 'text-white' : 'text-accent'
														}`}
													>
														{isYear
															? `${Math.round(
																	Number(discountedPrices[type]) * 12
															  )} `
															: `${discountedPrices[type]} `}
													</p>
												)}
												<span
													className={`text-3xl font-bold ${
														isYear && type === 'PREMIUM'
															? 'text-gray-500 font-medium'
															: isYear
															? 'text-yellow-5 font-medium'
															: type === 'PREMIUM'
															? 'text-gray-500 font-medium'
															: 'text-yellow-5 font-medium'
													}`}
												>
													₽
												</span>
											</div>
											<p
												className={`${
													isYear && type === 'PREMIUM'
														? 'text-gray-500'
														: isYear
														? 'text-yellow-5'
														: type === 'PREMIUM'
														? 'text-gray-500'
														: 'text-yellow-5'
												} text-#040404-500 mb-6 mt-1`}
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
											disabled={
												user?.getProfile?.activeSubscription?.isActive ||
												user?.getProfile?.isTrial
											}
											onClick={() => {
												sendGAEvent('event', 'buttonClicked', {
													value: 'payment_btn'
												})
												if (
													!user?.getProfile?.isTrial &&
													!user?.getProfile?.isTrialUsed
												) {
													setTrialModalOpen(true)
												} else if (user) {
													openModal(type)
												} else {
													router.replace('/auth/login')
												}
											}}
											color={'main'}
											variant='noneRound'
											disableAnimation
											className={`relative w-full rounded-none h-[70px] text-accent py-2 mt-auto max-640:h-[50px] ${
												user?.getProfile?.activeSubscription?.type === type ||
												(user?.getProfile?.isTrial && type === 'BASIC')
													? 'cursor-not-allowed bg-bg-accent'
													: user?.getProfile?.isTrial
													? 'cursor-not-allowed'
													: ''
											}`}
										>
											{user?.getProfile?.activeSubscription?.isActive ||
											(user?.getProfile?.isTrial && type === 'BASIC')
												? t('Your subscription')
												: !user?.getProfile?.isTrial &&
												  !user?.getProfile?.isTrialUsed
												? t('Try for free')
												: t('Subscribe')}
										</Button>
									</div>
								)
							)}
							<div className='col-span-3 bg-decor-1 h-[134px] rounded-[20px] flex justify-between p-5'>
								<div className='flex items-start flex-col'>
									<h1 className='text-[20px] font-bold'>
										{t('Corporate subscription')}
									</h1>
									<p className='text-base max-640:w-[70vw]'>
										{t(
											'Contact us if you are a company representative and want to work with us'
										)}
									</p>
								</div>
								<Button
									size={'mRound'}
									href={getRouteContacts()}
									isIconOnly
									startContent={
										<ArrowUpRight className={'w-[30px] h-[30px]'} />
									}
									variant={'circle'}
									as={Link}
									color={'main'}
									className={'n max-md:w-[50px] max-md:h-[50px] ml-8'}
								/>
							</div>
							<div className='col-span-3'>
								{user?.getProfile?.activeSubscription?.isActive ? (
									<>
										<h1 className='text-3xl font-bold'>
											{t('Subscription settings')}:
										</h1>
										<h1 className='text-xl font-medium text-center flex items-center my-4'>
											{t('Subscription end date')}
											{': '}
											<h2 className='text-2xl font-bold text-decor-2 ml-2'>
												{formatDate(
													user?.getProfile?.activeSubscription?.endedAt
												)}
											</h2>
										</h1>
										<div>
											<div>
												{isAutoRenewal ? (
													<Button
														className='rounded-2xl mb-3'
														onClick={confirmCancelSubscribe}
														color='accent'
													>
														{t('Cancel subscription')}
													</Button>
												) : (
													<div className='flex gap-1 items-center'>
														<h1 className='font-bold'>
															{t('Subscription status')}:
														</h1>
														<Button
															disabled
															disableAnimation
															isDisabled
															color='clear'
														>
															{t('Your subscription has been cancelled')}
														</Button>
													</div>
												)}
											</div>
											<p className='text-sm text-gray-2'>
												{t('For questions, write to email')}:{' '}
												<Link
													className='underline'
													href={'mailto:support@whai.ru'}
												>
													support@whai.ru
												</Link>
											</p>
										</div>
										<div className='mt-4 flex items-center justify-start'>
											<Switch
												classNames={{
													wrapper: 'group-data-[selected=true]:bg-decor-2'
												}}
												isSelected={isAutoRenewal}
												onClick={handleAutoRenewalToggleModal}
											/>
											<label className='ml-2'>{t('Enable auto-renewal')}</label>
										</div>
									</>
								) : user?.getProfile?.isTrial &&
								  user?.getProfile?.trialEndsAt ? (
									<>
										<h1 className='text-xl font-medium text-center flex items-center my-4'>
											{t('Trial end date')}
											{': '}
											<h2 className='text-2xl font-bold text-decor-2'>
												{formatDate(user?.getProfile?.trialEndsAt)}
											</h2>
										</h1>

										<div>
											<p className='text-sm text-gray-2'>
												{t('For questions, write to email')}:{' '}
												<Link
													className='underline'
													href={'mailto:support@whai.ru'}
												>
													support@whai.ru
												</Link>
											</p>
										</div>
									</>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
			{isTrialModalOpen && (
				<Modal
					color='white'
					isOpen={isTrialModalOpen}
					onOpenChange={() => setTrialModalOpen(false)}
				>
					<ModalContent>
						{onClose => (
							<>
								<ModalHeader className='flex flex-col gap-1 text-xl'>
									{t('Trial Subscription')}
								</ModalHeader>
								<ModalBody>
									<p className='text-lg'>
										{t(
											'Three days access without paying is a great opportunity to try out our platform No risks, only benefits Start your trial today and see how we can help you achieve more'
										)}
									</p>
									<p>
										<a
											href={getRouteSubscriptionTerm()}
											className='text-secondary'
										>
											{t('Read subscription terms')}
										</a>
									</p>
								</ModalBody>
								<ModalFooter>
									<Button
										size='xl'
										className='rounded-3xl w-[auto]'
										color='primary'
										onPress={handleTrialActivation}
									>
										{t('Activate Trial')}
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			)}
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
												isSelected={isAutoRenewalModal}
												onClick={handleAutoRenewalToggleModal}
											/>
											<label className='ml-2'>{t('Enable auto-renewal')}</label>
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
															isAutoRenewal: isAutoRenewalModal
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

			{/* Confirmation Modal for Auto-Renewal Change */}
			<Modal
				color='white'
				isOpen={showConfirmModal}
				onOpenChange={() => setShowConfirmModal(false)}
			>
				<ModalContent>
					<ModalHeader>{t('Confirm Auto-Renewal Change')}</ModalHeader>
					<ModalBody>
						<p>
							{t('Are you sure you want to change the auto-renewal setting?')}
						</p>
					</ModalBody>
					<ModalFooter>
						<Button
							size='xl'
							className='rounded-3xl w-[auto]'
							color='primary'
							onPress={cancelAutoRenewalChange}
						>
							{t('Cancel')}
						</Button>
						<Button
							size='xl'
							className='rounded-3xl w-[auto]'
							color='secondary'
							onPress={confirmAutoRenewalChange}
						>
							{t('Confirm')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Layout>
	)
}

export default SubsPage
