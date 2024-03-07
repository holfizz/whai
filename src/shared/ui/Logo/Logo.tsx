'use client'
import BigLogoIcon from '@/shared/assets/WhaiBig.svg'
import SmallLogoIcon from '@/shared/assets/WhaiSmall.svg'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { useRouter } from 'next/navigation'
import { FC, memo } from 'react'
import cls from './Logo.module.scss'

export enum LogoSize {
	S = 'small',
	M = 'medium',
	FULL = 'full',
}

interface LogoProps {
	className?: string
	logoSize?: LogoSize
	color?: string
	logoType?: 'long' | 'short'
}

const Logo: FC<LogoProps> = memo(
	({
		className,
		logoSize = LogoSize.S,
		color = '#2E311D',
		logoType = 'small',
	}) => {
		const mods: Mods = {
			[cls[logoSize]]: true,
		}
		const router = useRouter()
		const LOGO_TYPE = logoType === 'short' ? SmallLogoIcon : BigLogoIcon
		return (
			<button
				className={classNames(cls.logoButton, mods, [])}
				type={'button'}
				onClick={() => router.push('/')}
			>
				<LOGO_TYPE
					style={{
						fill: color,
					}}
					className={classNames(cls.Logo, {}, [className])}
				/>
			</button>
		)
	},
)

export default Logo
