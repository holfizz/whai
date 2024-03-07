'use client'
import Button from '@/shared/ui/Button/Button'
import cls from './mainPage.module.scss'

import { Navbar } from '@/widgets/Navbar'

export default function Page() {
	return (
		<>
			<div className={cls.navbarWrapper}>
				<Navbar />
			</div>
			<div className={cls.welcomeBlock}>
				<h1 className={cls.mainPageTitle}>
					{String('The internet is your education').toUpperCase()}
				</h1>
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
