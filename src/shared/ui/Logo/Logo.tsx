'use client'
import LogoIcon from '@/shared/assets/Whai.svg'
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
}

const Logo: FC<LogoProps> = memo(
	({ className, logoSize = LogoSize.S, color = '#2E311D' }) => {
		const mods: Mods = {
			[cls[logoSize]]: true,
		}
		const router = useRouter()
		return (
			<button type={'button'} onClick={() => router.push('/')}>
				<LogoIcon
					style={{ fill: color }}
					className={classNames(cls.Logo, mods, [className])}
				/>
			</button>
		)
	},
)

export default Logo
