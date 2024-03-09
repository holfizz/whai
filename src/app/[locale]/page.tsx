'use client'
import cls from './mainPage.module.scss'

import LangSwitcher from '@/features/langSwitcher'
import { Navbar } from '@/widgets/Navbar'

import { useTranslations } from 'next-intl'
export default function Page() {
	const t = useTranslations('mainPage')

	return (
		<>
			<div className={cls.navbarWrapper}>
				<Navbar />
			</div>
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
			<LangSwitcher />
		</>
	)
}
