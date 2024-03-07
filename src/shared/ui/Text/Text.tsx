import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { FC, memo } from 'react'
import cls from './Text.module.scss'

export enum TextTheme {
	PRIMARY = 'primary',
	ERROR = 'error',
	SUCCESS = 'success',
	MAIN = 'main',
}

export enum TextAlign {
	RIGHT = 'right',
	LEFT = 'left',
	CENTER = 'center',
}

export enum TextSize {
	S = 'size_s',
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
}

interface TextProps {
	className?: string
	title?: string
	text?: string
	theme?: TextTheme
	align?: TextAlign
	size?: TextSize
}

const Text: FC<TextProps> = memo(props => {
	const {
		className,
		text,
		title,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
		size = TextSize.L,
	} = props

	const mods: Mods = {
		[cls[align]]: true,
		[cls[theme]]: true,
		[cls[size]]: true,
	}
	type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4'
	const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
		[TextSize.S]: 'h4',
		[TextSize.M]: 'h3',
		[TextSize.L]: 'h2',
		[TextSize.XL]: 'h1',
	}
	const HeaderTag = mapSizeToHeaderTag[size]
	return (
		<div className={classNames('', mods, [className])}>
			{title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	)
})

export default Text
