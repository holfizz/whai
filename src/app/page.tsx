'use client'
import Button from '@/shared/ui/Button/Button'
import cls from './mainPage.module.scss'

import Asterisk from '@/shared/assets/icons/asterisk.svg'
import LogoSmall from '@/shared/assets/logo/WhaiSmall.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import Icon from '@/shared/ui/Icon/Icon'
import { Navbar } from '@/widgets/Navbar'
import { useTranslation } from 'react-i18next'

export default function Page() {
	const { t } = useTranslation('mainPage')
	return (
		<>
			<div className={cls.navbarWrapper}>
				<Navbar />
			</div>
			<div className={cls.welcomeBlock}>
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
			</div>
			<Button>dasdasdasda</Button>
			<Button>dasdasdasda</Button>
			<Button>dasdasdasda</Button>
			<Button>dasdasdasda</Button>
			<Button>dasdasdasda</Button>
			<Button>dasdasdasda</Button>
			<Button>dasdasdasda</Button>
			<Button>dasdasdasda</Button>
		</>
	)
}
