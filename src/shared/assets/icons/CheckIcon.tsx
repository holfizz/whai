import React from 'react'

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='23'
			height='16'
			viewBox='0 0 23 16'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M22.0627 0.659495C22.711 1.33864 22.6859 2.41473 22.0068 3.06301L9.17387 15.3958C8.84255 15.7121 8.39761 15.8813 7.93986 15.8651C7.48211 15.8488 7.05027 15.6486 6.74216 15.3097L0.472387 8.54039C-0.159174 7.84567 -0.107976 6.77051 0.586742 6.13895C1.28146 5.50739 2.35662 5.55858 2.98818 6.2533L8.08625 11.7337L19.6592 0.603599C20.3383 -0.0446775 21.4144 -0.0196521 22.0627 0.659495Z'
				fill='#FFB57F'
			/>
		</svg>
	)
}

export default CheckIcon
