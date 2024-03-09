'use client'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { FC, memo } from 'react'
import cls from './Line.module.scss'
export enum LineSize {
	FULL = 'full',
	LONG = 'long',
	SHORT = 'short',
}
interface LineProps {
	className?: string
	lineSize?: LineSize
	color?: string
}
const Line: FC<LineProps> = memo(
	({ className, lineSize = LineSize.FULL, color = '#000' }) => {
		const mods: Mods = {
			[cls[lineSize]]: true,
		}
		return (
			<div
				style={{ background: color }}
				className={classNames(cls.line, mods, [className])}
			></div>
		)
	},
)

export default Line
