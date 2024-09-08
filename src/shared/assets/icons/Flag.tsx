import React from 'react'

const FlagIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='12'
			height='14'
			viewBox='0 0 12 14'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M2.66663 0.333496C1.56206 0.333496 0.666626 1.22893 0.666626 2.3335V13.0002C0.666626 13.3684 0.965103 13.6668 1.33329 13.6668C1.70148 13.6668 1.99996 13.3684 1.99996 13.0002V8.21969C2.20848 8.29339 2.43287 8.3335 2.66663 8.3335H9.94621C11.0642 8.3335 11.6858 7.04025 10.9874 6.16724L9.52038 4.3335L10.9874 2.49976C11.6858 1.62674 11.0642 0.333496 9.94621 0.333496H2.66663Z'
				fill='#FFB57F'
			/>
		</svg>
	)
}

export default FlagIcon
