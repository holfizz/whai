import React from 'react'

const LockIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='22'
			height='29'
			viewBox='0 0 22 29'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M5 10.5V6C5 2.68629 7.68629 0 11 0C14.3137 0 17 2.68629 17 6V10.5H18.5C20.1569 10.5 21.5 11.8431 21.5 13.5V25.5C21.5 27.1569 20.1569 28.5 18.5 28.5H3.5C1.84315 28.5 0.5 27.1569 0.5 25.5V13.5C0.5 11.8431 1.84315 10.5 3.5 10.5H5ZM14 6V10.5H8V6C8 4.34315 9.34315 3 11 3C12.6569 3 14 4.34315 14 6Z'
				fill='#FCB974'
			/>
		</svg>
	)
}

export default LockIcon
