'use client'
import { Link } from '@/navigation'
import { getRoutePrivacy } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Footer } from './Footer'
import './Layout.scss'
import { Navbar } from './Navbar'
interface LayoutProps {
	children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
	const t = useTranslations('Layout')
	const [showCookieBanner, setShowCookieBanner] = useState(false)

	useEffect(() => {
		const cookieConsent = Cookies.get('cookieConsent')
		if (!cookieConsent) {
			setShowCookieBanner(true)
		}
	}, [])

	// Функция для обработки нажатия на кнопку "Окей"
	const handleAcceptCookies = () => {
		Cookies.set('cookieConsent', 'true', { expires: 365 }) // Сохраняем согласие на 1 год
		setShowCookieBanner(false)
	}

	return (
		<div className='layout-container'>
			<Navbar />
			<main className='content'>{children}</main>
			<Footer />
			{showCookieBanner && (
				<div className='cookie-banner'>
					<p>
						{t(
							'By using the site, you consent to the collection of cookies and agree to'
						)}{' '}
						<Link className='underline' href={getRoutePrivacy()}>
							{t('personal data processing policy')}
						</Link>
					</p>
					<Button
						color='main'
						className='rounded-2xl'
						onClick={handleAcceptCookies}
					>
						{t('Okey')}
					</Button>
				</div>
			)}
		</div>
	)
}
