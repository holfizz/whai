import React from 'react'

const BellIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='24'
			height='30'
			viewBox='0 0 24 30'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M19.5 10.5V16.95C21.15 17.85 24 19.95 24 24C24 24.75 23.25 25.5 22.5 25.5H16.5C16.5 27.9853 14.4853 30 12 30C9.51472 30 7.5 27.9853 7.5 25.5H1.5C0.75 25.5 0 24.75 0 24C0 19.95 2.85 17.85 4.5 17.1V10.5C4.5 6.9 7.05 3.9 10.5 3.15V1.5C10.5 0.75 11.25 0 12 0C12.75 0 13.5 0.75 13.5 1.5V3.15C16.95 3.9 19.5 6.9 19.5 10.5ZM10.5 25.5C10.5 26.3284 11.1716 27 12 27C12.8284 27 13.5 26.3284 13.5 25.5H10.5Z'
				fill='#FFB57F'
			/>
		</svg>
	)
}

export default BellIcon
