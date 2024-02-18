import { FC, memo, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Tooltip.module.scss'

interface TooltipProps {
	className?: string
	children: ReactNode
}

const Tooltip: FC<TooltipProps> = memo(({ className, children }) => {
	return (
		<div className={classNames(cls.tooltip, {}, [className])}>{children}</div>
	)
})

export default Tooltip
