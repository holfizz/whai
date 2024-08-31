import { Divider } from '@nextui-org/react'

export const ListWrapperUl = ({
	children,
	className,
	size = 'md'
}: {
	children: any
	className?: string
	size?: 'sm' | 'md'
}) => {
	return (
		<div className={`flex ${size === 'md' && 'bg-decor-1 p-4 rounded-xl'}`}>
			<Divider
				orientation='vertical'
				className={`w-[2px] rounded-sm h-[inherit]`}
			/>
			<ul
				className={`flex flex-col ${
					size === 'md' ? 'ml-4' : 'ml-1'
				} ${className}`}
			>
				{children}
			</ul>
		</div>
	)
}

export const ListWrapperOl = ({
	children,
	className
}: {
	children: any
	className: string
}) => {
	return (
		<div className={`flex bg-error-1 p-4 rounded-xl`}>
			<Divider
				orientation='vertical'
				className={'w-[2px] rounded-sm h-[inherit]'}
			/>
			<ol className={`flex flex-col ml-8 *:list-decimal ${className}`}>
				{children}
			</ol>
		</div>
	)
}
