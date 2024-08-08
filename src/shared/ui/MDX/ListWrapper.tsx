import { Divider } from '@nextui-org/react'

export const ListWrapperUl = ({
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
			<ul className={`flex flex-col ml-4 ${className}`}>{children}</ul>
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
	return <ol className={'flex'}></ol>
}
