import { classNames } from '@/shared/lib/classNames/classNames'
import { FC, memo } from 'react'

import cls from './Icon.module.scss'

interface IconProps extends Omit<any, 'ref'> {
	className?: string
	SVG: any
	fontSize?: number | string
	margin?: string
	color?: string
}

const Icon: FC<IconProps> = memo(
	({ className, SVG, fontSize, margin, color, ...otherProps }) => {
		return (
			<SVG
				style={{ fontSize: fontSize, margin: margin, fill: color }}
				className={classNames(cls.Icon, {}, [className])}
				{...otherProps}
			/>
		)
	}
)

export default Icon
