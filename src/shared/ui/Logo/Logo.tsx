'use client'
import { Link } from '@/navigation'
import { Whai_logo40x40 } from '@/shared/assets/logo/WhaiLogo'
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
		logoType = 'short'
	}) => {
		const mods: Mods = {
			[cls[logoSize]]: true
		}
		return (
			<Link
				href={isDashboard ? getDashboardRoute() : getRouteMain()}
				className={classNames(cls.logoButton, mods, [])}
				type={'button'}
			>
				<div
					className={`flex items-center justify-center ${
						logoType === 'long' ? 'w-[200px]' : 'w-[45px]'
					}`}
				>
					<div
						className={`${
							logoType === 'long' ? 'w-[200px]' : 'w-[45px]'
						} h-[45px] bg-decor-2 rounded-[11px] text-[30px] font-extrabold flex items-center justify-center`}
					>
						<Whai_logo40x40 />
					</div>
				</div>
			</Link>
		)
	}
)

export default Logo
