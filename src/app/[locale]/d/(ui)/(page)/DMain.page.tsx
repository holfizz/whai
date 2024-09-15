'use client'

import PageHeader from '@/app/[locale]/d/(ui)/pageHeader/pageHeader'
import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { Link } from '@/navigation'
import { getFAQRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import Tour from 'reactour'
import useUnifiedStore from '../../c/create/(model)/unified.state'
import './OnboardingTour.scss'

const DMain = () => {
	const t = useTranslations('Dashboard')
	const { userData } = useGetProfile()
	const { resetState } = useUnifiedStore()
	const [isOpen, setIsOpen] = useState(false)
	const [steps, setSteps] = useState([])

	const isMobile = () => window.innerWidth <= 640

	const isMenuOpen = () => {
		const menuElement = document.querySelector('[data-tour-step="menu"]')
		return menuElement && menuElement.classList.contains('open')
	}

	useEffect(() => {
		resetState()

		// Проверяем, был ли пройден онбординг ранее
		const onboardingCompleted = Cookies.get('onboardingCompleted')
		if (!onboardingCompleted) {
			setIsOpen(true)
		}

		// Базовые шаги онбординга
		const baseSteps = [
			{
				selector: '[data-tour-step="welcome-block"]',
				content: (
					<div>
						<p>
							<strong>Главный блок</strong> - ваш центр управления:
						</p>
						<ul>
							<li>Отслеживайте свой опыт взаимодействия с платформой</li>
							<li>Создавайте нужный вам материал</li>
						</ul>
					</div>
				)
			},
			{
				selector: '[data-tour-step="continue"]',
				content: (
					<div>
						<p>
							<strong>Продолжение обучения:</strong>
						</p>
						<ul>
							<li>Ваш последний активный курс всегда доступен здесь</li>
							<li>Одно нажатие - и вы продолжаете с места остановки</li>
						</ul>
					</div>
				)
			}
		]

		// Добавляем шаги для мобильной версии и шаг с меню
		if (isMobile()) {
			baseSteps.push(
				{
					selector: '[data-tour-step="menu"]',
					content: (
						<div>
							<p>
								<strong>Откройте меню:</strong>
							</p>
							<ul>
								<li>В меню вы сможете найти все необходимые разделы</li>
							</ul>
						</div>
					),
					//@ts-ignore
					action: () => {
						if (!isMenuOpen()) {
							//@ts-ignore
							document.querySelector('[data-tour-step="menu"]')?.click()
						}
					}
				},
				{
					selector: '[data-tour-step="mobile-limits"]',
					content: (
						<div>
							<p>
								<strong>Система лимитов:</strong>
							</p>
							<ul>
								<li>Определяет ваши возможности на платформе</li>
								<li>
									Три вида лимитов влияют на создание и прохождение курсов
								</li>
							</ul>
							<p>
								<Link
									className='text-secondary text-sm mt-2'
									href={getFAQRoute()}
								>
									Подробнее о лимитах в нашем FAQ
								</Link>
							</p>
						</div>
					)
				},
				{
					selector: '[data-tour-step="mobile-subscription"]',
					content: (
						<div>
							<p>
								<strong>Управление подпиской:</strong>
							</p>
							<ul>
								<li>Просмотр доступных тарифов</li>
								<li>
									Активация{' '}
									<span className='font-bold text-decor-2'>
										бесплатного доступа
									</span>
								</li>
								<li>Обновление текущей подписки</li>
							</ul>
							<p>
								<em>Каждый тариф имеет свои преимущества и лимиты</em>
							</p>
						</div>
					)
				}
			)
		} else {
			// Шаги для десктопной версии
			baseSteps.push(
				{
					selector: '[data-tour-step="limits"]',
					content: (
						<div>
							<p>
								<strong>Система лимитов:</strong>
							</p>
							<ul>
								<li>Определяет ваши возможности на платформе</li>
								<li>
									Три вида лимитов влияют на создание и прохождение курсов
								</li>
							</ul>
							<p>
								<Link
									className='text-secondary text-sm mt-2'
									href={getFAQRoute()}
								>
									Подробнее о лимитах в нашем FAQ
								</Link>
							</p>
						</div>
					)
				},
				{
					selector: '[data-tour-step="subscription"]',
					content: (
						<div>
							<p>
								<strong>Управление подпиской:</strong>
							</p>
							<ul>
								<li>Просмотр доступных тарифов</li>
								<li>
									Активация{' '}
									<span className='font-bold text-decor-2'>
										бесплатного доступа
									</span>
								</li>
								<li>Обновление текущей подписки</li>
							</ul>
							<p>
								<em>Каждый тариф имеет свои преимущества и лимиты</em>
							</p>
						</div>
					)
				}
			)
		}

		setSteps(baseSteps)
	}, [resetState])

	// Функция для закрытия тура только на последнем шаге
	const handleTourClose = () => {
		// Сохраняем информацию о завершении онбординга в куки
		Cookies.set('onboardingCompleted', 'true', { expires: 365 }) // Сохраняем на 1 год
		setIsOpen(false)
	}

	return (
		<>
			<Tour
				isOpen={isOpen}
				steps={steps}
				onRequestClose={handleTourClose}
				showDots={false}
				rounded={15}
				accentColor='#FCAD75FF'
				disableCloseOnEsc={true}
				disableInteraction={true}
				showCloseButton={false}
				lastStepNextButton={
					<Button
						color='accent'
						className='rounded-2xl'
						onClick={handleTourClose}
					>
						Завершить
					</Button>
				}
			/>

			<DashboardLayout>
				<PageHeader userData={userData} />
			</DashboardLayout>
		</>
	)
}

export default DMain
