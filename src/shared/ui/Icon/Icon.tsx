import { classNames } from '@/shared/lib/classNames/classNames'
import { LucideIcon } from 'lucide-react'
import { FC, memo } from 'react'
import { IconType } from 'react-icons'
import cls from './Icon.module.scss'

interface IconProps extends Omit<IconType, 'ref'> {
	className?: string
	SVG: LucideIcon
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
	},
)

export default Icon
