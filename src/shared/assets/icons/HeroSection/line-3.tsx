import React from 'react'

const Line3 = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='249'
			height='282'
			viewBox='0 0 249 282'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M9 186.012C9 32.5124 75.6373 9 96.6102 9C208.243 9 205.091 295.275 123.365 271.389C48.9053 249.633 105.045 124.238 195.172 173.315C246.255 201.124 239.623 243.988 238.739 269.246'
				strokeWidth='18'
				strokeMiterlimit='10'
				strokeLinecap='round'
				stroke='currentColor'
				style={{
					strokeDasharray: '1000', // Set a large value for initial offset
					strokeDashoffset: '1000', // Set the same value for initial offset
					transition: 'stroke-dashoffset 2s ease-out'
				}}
			/>
		</svg>
	)
}

export default Line3
