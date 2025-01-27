import { ChangeEvent, FC, InputHTMLAttributes, memo } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'readOnly' | 'size'
>

export enum InputTheme {
	OUTLINE = 'outline',
	CLEAR = 'clear',
	FILL = 'fill',
	WHITE = 'white'
}
export enum InputSize {
	PRIMARY = 'primary',
	FULL = 'full'
}

export enum InputRounded {
	LG = 'roundedLg',
	MD = 'roundedMd',
	SM = 'roundedSm'
}

interface InputProps extends HTMLInputProps {
	className?: string
	value?: string | number
	theme?: InputTheme
	rounded?: InputRounded
	onChange?: (value: string) => void
	readonly?: boolean
	size?: InputSize
}

const Input: FC<InputProps> = memo(props => {
	const {
		className,
		onChange,
		value,
		type = 'text',
		theme = InputTheme.OUTLINE,
		rounded = InputRounded.MD,
		readonly,
		size = InputSize.PRIMARY,
		...otherProps
	} = props
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
	}
	const mods: Mods = {
		[cls[theme]]: true,
		[cls[size]]: true,
		[cls[rounded]]: true,
		[cls.readonly]: readonly
	}
	return (
		<input
			className={classNames(cls.Input, mods, [className])}
			onChange={onChangeHandler}
			type={type}
			value={value}
			{...otherProps}
			readOnly={readonly}
		/>
	)
})

export default Input
