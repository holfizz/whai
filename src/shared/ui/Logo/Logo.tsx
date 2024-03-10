'use client'
import { useRouter } from '@/navigation'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { FC, memo } from 'react'
import BigLogoIcon from '../../assets/logo/WhaiBig.svg'
import SmallLogoIcon from '../../assets/logo/WhaiSmall.svg'
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
		const router = useRouter()

		const mods: Mods = {
			[cls[logoSize]]: true,
		}
		const LOGO_TYPE = logoType === 'short' ? SmallLogoIcon : BigLogoIcon
		return (
			<button
				className={classNames(cls.logoButton, mods, [])}
				type={'button'}
				onClick={() => router.push('/')}
			>
				{/* <LogoIcon width={300} style={{ fill: color, width: '100px' }} /> */}
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
