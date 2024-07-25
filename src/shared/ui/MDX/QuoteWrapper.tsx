import React from 'react'

const QuoteWrapper = ({
	children,
	color
}: {
	children: any
	color?: string
}) => {
	const singleQuoteRegex = /'([^']+)'/g
	const doubleQuoteRegex = /"([^"]+)"/g

	const processChildren = children => {
		return React.Children.map(children, child => {
			if (typeof child === 'string') {
				let parts = child.split(singleQuoteRegex)
				// @ts-ignore
				parts = parts.map((part, index) =>
					index % 2 === 1 ? (
						<span
							key={index}
							style={{ background: color }}
							className='bg-lime-200 p-[2px] m-[1px] inline-block rounded'
						>
							{part}
						</span>
					) : (
						part
					)
				)

				// @ts-ignore
				parts = parts.map(part => {
					if (typeof part === 'string') {
						const innerParts = part.split(doubleQuoteRegex)
						return innerParts.map((innerPart, index) =>
							index % 2 === 1 ? (
								<span
									key={index}
									className='bg-cyan-100 p-[2px] m-[1px] inline-block rounded'
								>
									{innerPart}
								</span>
							) : (
								innerPart
							)
						)
					}
					return part
				})

				return parts.flat() // Flatten the nested arrays
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

export default QuoteWrapper
