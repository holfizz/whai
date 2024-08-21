'use client'
import { Link, useRouter } from '@/navigation'
import { WhaiBig } from '@/shared/assets/logo/WhaiBig'
import { WhaiSmall } from '@/shared/assets/logo/WhaiSmall'
import { getDashboardRoute, getRouteMain } from '@/shared/const/router'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { FC, memo } from 'react'
import cls from './Logo.module.scss'

export enum LogoSize {
	S = 'small',
	M = 'medium',
	FULL = 'full'
}

interface LogoProps {
	className?: string
	logoSize?: LogoSize
	color?: string
	isDashboard?: boolean
	logoType?: 'long' | 'short'
}

const Logo: FC<LogoProps> = memo(
	({
		className,
		logoSize = LogoSize.S,
		color = '#2E311D',
		isDashboard = true,
		logoType = 'small'
	}) => {
		const router = useRouter()

		const mods: Mods = {
			[cls[logoSize]]: true
		}
		const LOGO_TYPE = logoType === 'short' ? WhaiSmall : WhaiBig
		return (
			<Link
				href={isDashboard ? getDashboardRoute() : getRouteMain()}
				className={classNames(cls.logoButton, mods, [])}
				type={'button'}
			>
				{/* <LogoIcon width={300} style={{ fill: color, width: '100px' }} /> */}
				{/* ERROR*/}
				<LOGO_TYPE
					style={{
						fill: color
					}}
					className={classNames(cls.Logo, {}, [className])}
				/>
			</Link>
		)
	}
)

export default Logo
