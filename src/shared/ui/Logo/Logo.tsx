'use client'
import { Link, useRouter } from '@/navigation'
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
		logoType = 'long'
	}) => {
		const router = useRouter()

		const mods: Mods = {
			[cls[logoSize]]: true
		}
		// const LOGO_TYPE = logoType === 'short' ? WhaiSmall : WhaiBig
		return (
			<Link
				href={isDashboard ? getDashboardRoute() : getRouteMain()}
				className={classNames(cls.logoButton, mods, [])}
				type={'button'}
			>
				{/* <LogoIcon width={300} style={{ fill: color, width: '100px' }} /> */}
				{/* ERROR*/}
				{/* <LOGO_TYPE
					style={{
						fill: color
					}}
					className={classNames(cls.Logo, {}, [className])}
				/> */}
				<div className='flex items-center justify-center'>
					<div className='w-[45px] h-[45px] bg-decor-3 rounded-xl text-[30px] font-extrabold flex items-center justify-center'>
						W
					</div>
					{logoType === 'long' && (
						<Link
							className='text-3xl font-extrabold ml-4'
							href={isDashboard ? getDashboardRoute() : getRouteMain()}
						>
							Whai
						</Link>
					)}
				</div>
			</Link>
		)
	}
)

export default Logo
