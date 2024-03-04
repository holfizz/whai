import { classNames } from '@/shared/lib/classNames/classNames'
import { FC, memo } from 'react'
import { IconType } from 'react-icons'
import cls from './Icon.module.scss'

interface IconProps extends Omit<IconType, 'ref'> {
	className?: string
	SVG: IconType
	fontSize?: number | string
	margin?: string
	color?: string
}

const Icon: FC<IconProps> = memo(
	({ className, SVG, fontSize, margin, color, ...otherProps }) => {
		return (
			<SVG
				style={{ fontSize: fontSize, margin: margin, color }}
				className={classNames(cls.Icon, {}, [className])}
				{...otherProps}
			/>
		)
	},
)

export default Icon
