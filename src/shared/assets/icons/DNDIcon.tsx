import React from 'react'

const DNDIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='10'
			height='16'
			viewBox='0 0 10 16'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M10 2C10 3.10457 9.10457 4 8 4C6.89543 4 6 3.10457 6 2C6 0.895431 6.89543 0 8 0C9.10457 0 10 0.895431 10 2Z'
				fill='#BDBDBD'
			/>
			<path
				d='M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z'
				fill='#BDBDBD'
			/>
			<path
				d='M10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12C9.10457 12 10 12.8954 10 14Z'
				fill='#BDBDBD'
			/>
			<path
				d='M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2Z'
				fill='#BDBDBD'
			/>
			<path
				d='M4 8C4 9.10457 3.10457 10 2 10C0.895431 10 0 9.10457 0 8C0 6.89543 0.895431 6 2 6C3.10457 6 4 6.89543 4 8Z'
				fill='#BDBDBD'
			/>
			<path
				d='M4 14C4 15.1046 3.10457 16 2 16C0.895431 16 0 15.1046 0 14C0 12.8954 0.895431 12 2 12C3.10457 12 4 12.8954 4 14Z'
				fill='#BDBDBD'
			/>
		</svg>
	)
}

export default DNDIcon
