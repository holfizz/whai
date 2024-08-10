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
		<div className={'flex'}>
			<Divider
				orientation='vertical'
				className={`w-[${
					size === 'md' ? '3px' : '2px'
				} ] rounded-sm h-[inherit]`}
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
		<div className={'flex'}>
			<Divider
				orientation='vertical'
				className={'w-[3px] rounded-sm h-[inherit]'}
			/>
			<ol className={`flex flex-col ml-8 *:list-decimal ${className}`}>
				{children}
			</ol>
		</div>
	)
}
