import React from 'react'

const ParenthesesWrapper = ({
	children,
	className,
	color
}: {
	children: any
	className?: string
	color?: string
}) => {
	const regex = /\(([^)]+)\)/g

	const processChildren = children => {
		return React.Children.map(children, child => {
			if (typeof child === 'string') {
				const parts = child.split(regex)
				return parts.map((part, index) =>
					index % 2 === 1 ? (
						<span
							key={index}
							className={`${
								color ? color : 'bg-error-1'
							} p-[2px] m-[1px] inline-block rounded ${className}`}
						>
							({part})
						</span>
					) : (
						part
					)
				)
			} else if (React.isValidElement(child)) {
				return React.cloneElement(child, {
					// @ts-ignore

					children: processChildren(child.props.children)
				})
			}
			return child
		})
	}

	return <>{processChildren(children)}</>
}

export default ParenthesesWrapper
