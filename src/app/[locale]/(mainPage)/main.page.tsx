'use client'
import cls from './mainPage.module.scss'

import LangSwitcher from '@/features/langSwitcher'
import { Navbar } from '@/widgets/Navbar'
import { AccountSetting03Icon } from '@hugeicons/react-pro'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
export default function MainPage() {
	const t = useTranslations('mainPage')
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])
	return (
		<>
			<div className={cls.navbarWrapper}>{isClient && <Navbar />}</div>
			{/* <div className={cls.welcomeBlock}>
				<div className={cls.textBlock}>
					<div className={cls.titleBlock}>
						<h1
							className={classNames(cls.mainPageTitle_one, {}, [
								cls.mainPageTitle,
							])}
						>
							{t('The internet')}
						</h1>
						<h1
							className={classNames(cls.mainPageTitle_two, {}, [
								cls.mainPageTitle,
							])}
						>
							{t('and AI')}
							<Icon
								color='var(--main-color)'
								className={cls.logoSmall}
								SVG={LogoSmall}
							/>
							<Icon
								color='var(--main-color)'
								className={cls.logoSmall}
								SVG={LogoSmall}
							/>
							<Icon
								color='var(--main-color)'
								className={cls.logoSmall}
								SVG={LogoSmall}
							/>
							<Icon
								color='var(--main-color)'
								className={cls.logoSmall}
								SVG={LogoSmall}
							/>
						</h1>
						<h1
							className={classNames(cls.mainPageTitle_three, {}, [
								cls.mainPageTitle,
							])}
						>
							{t('is your')}
						</h1>
						<h1
							className={classNames(cls.mainPageTitle_four, {}, [
								cls.mainPageTitle,
							])}
						>
							{t('education')}
						</h1>
					</div>
					<Icon className={cls.asterisk} SVG={Asterisk} />
				</div>
			</div> */}
			<AccountSetting03Icon />
			<LangSwitcher />
		</>
	)
}
