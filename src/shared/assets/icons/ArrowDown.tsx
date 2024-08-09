import React from 'react'

const ArrowDown = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='12'
			height='7'
			viewBox='0 0 12 7'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M6.70711 6.70711C6.31658 7.09763 5.68342 7.09763 5.29289 6.70711L0.292893 1.70711C-0.0976315 1.31658 -0.0976315 0.683417 0.292893 0.292893C0.683417 -0.097631 1.31658 -0.097631 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.097631 11.3166 -0.097631 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L6.70711 6.70711Z'
				fill='#0F0F0F'
			/>
		</svg>
	)
}

export default ArrowDown
