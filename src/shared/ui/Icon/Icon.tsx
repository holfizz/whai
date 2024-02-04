import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.scss'
import { IconType } from 'react-icons'

interface IconProps extends Omit<IconType, 'ref'> {
	className?: string
	SVG: IconType
	fontSize?: number | string
}

const Icon: FC<IconProps> = memo(
	({ className, SVG, fontSize, ...otherProps }) => {
		return (
			<SVG
				style={{ fontSize: fontSize }}
				className={classNames(cls.Icon, {}, [className])}
				{...otherProps}
			/>
		)
	},
)

export default Icon
