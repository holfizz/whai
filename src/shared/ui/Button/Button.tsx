import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { ReactNode, memo, type ButtonHTMLAttributes, type FC } from 'react'
import cls from './Button.module.scss'

export enum ButtonTheme {
	CLEAR = 'clear',
	OUTLINE = 'outline',
	FILL = 'fill',
	FILL_MAIN = 'fill_main',
}

export enum ButtonSize {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
	FULL = 'size_full',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	theme?: ButtonTheme
	size?: ButtonSize
	disabled?: boolean
	children?: ReactNode
}

const Button: FC<ButtonProps> = memo(
	({
		className,
		children,
		theme = ButtonTheme.CLEAR,
		size = ButtonSize.M,
		disabled,
		...otherProps
	}) => {
		const mods: Mods = {
			[cls[theme]]: true,
			[cls[size]]: true,
			[cls.disabled]: disabled,
		}
		return (
			<button
				disabled={disabled}
				type={'button'}
				className={classNames(cls.Button, mods, [className, cls[theme]])}
				{...otherProps}
			>
				{children}
			</button>
		)
	},
)

export default Button
