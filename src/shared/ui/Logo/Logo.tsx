'use client'
import { FC, memo } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Logo.module.scss'
import LogoIcon from '@/shared/assets/Whai.svg'
import { useRouter } from 'next/navigation'

export enum LogoSize {
	S = 'small',
	M = 'medium',
	L = 'large',
}

interface LogoProps {
	className?: string
	logoSize?: LogoSize
}

const Logo: FC<LogoProps> = memo(({ className, logoSize = LogoSize.S }) => {
	const mods: Mods = {
		[cls[logoSize]]: true,
	}
	const router = useRouter()
	return (
		<button type={'button'} onClick={() => router.push('/')}>
			<LogoIcon className={classNames(cls.Logo, mods, [className])} />
		</button>
	)
})

export default Logo
