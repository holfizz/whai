import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { Skeleton } from '@nextui-org/react'
import { FC, memo } from 'react'
import cls from './Text.module.scss'

export enum TextTheme {
	PRIMARY = 'primary',
	ERROR = 'error',
	SUCCESS = 'success',
	MAIN = 'main'
}

export enum TextAlign {
	RIGHT = 'right',
	LEFT = 'left',
	CENTER = 'center'
}

export enum TextSize {
	S = 'size_s',
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
	SM = 'SM'
}

interface TextProps {
	className?: string
	classNameText?: string
	classNameTitle?: string
	title?: string
	text?: string
	theme?: TextTheme
	align?: TextAlign
	size?: TextSize
	isLoading?: boolean
}

const Text: FC<TextProps> = memo(props => {
	const {
		className,
		classNameText,
		classNameTitle,
		text,
		title,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
		size = TextSize.L,
		isLoading
	} = props

	const mods: Mods = {
		[cls[align]]: true,
		[cls[theme]]: true,
		[cls[size]]: true
	}
	type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4'
	const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
		[TextSize.S]: 'h4',
		[TextSize.M]: 'h3',
		[TextSize.L]: 'h2',
		[TextSize.XL]: 'h1'
	}
	const HeaderTag = mapSizeToHeaderTag[size]
	if (isLoading) {
		return (
			<div>
				{title && <Skeleton className='rounded-2xl w-[150px] h-4' />}
				{text && <Skeleton className='rounded-2xl mt-3 w-[200px] h-4' />}
			</div>
		)
	}
	return (
		<div className={classNames('', mods, [className])}>
			{title && (
				<HeaderTag className={[cls.title, classNameTitle].join(' ')}>
					{title}
				</HeaderTag>
			)}
			{text && <p className={[cls.text, classNameText].join(' ')}>{text}</p>}
		</div>
	)
})

export default Text
