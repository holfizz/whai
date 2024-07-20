import React from 'react'

const MessageIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='14'
			height='14'
			viewBox='0 0 14 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M0.333008 2.3335C0.333008 1.22893 1.22844 0.333496 2.33301 0.333496H11.6663C12.7709 0.333496 13.6663 1.22893 13.6663 2.3335V9.34356C13.6663 10.2585 12.9246 11.0002 12.0097 11.0002H11.6663V12.9464C11.6663 13.5054 11.0197 13.8162 10.5832 13.467L7.49969 11.0002H2.33301C1.22844 11.0002 0.333008 10.1047 0.333008 9.00017V2.3335ZM2.33301 3.66683C2.33301 3.29864 2.63148 3.00016 2.99967 3.00016H9.66634C10.0345 3.00016 10.333 3.29864 10.333 3.66683C10.333 4.03502 10.0345 4.3335 9.66634 4.3335H2.99967C2.63148 4.3335 2.33301 4.03502 2.33301 3.66683ZM2.33301 6.3335C2.33301 5.96531 2.63148 5.66683 2.99967 5.66683H6.99967C7.36786 5.66683 7.66634 5.96531 7.66634 6.3335C7.66634 6.70169 7.36786 7.00016 6.99967 7.00016H2.99967C2.63148 7.00016 2.33301 6.70169 2.33301 6.3335Z'
				fill='var(--color-accent)'
			/>
		</svg>
	)
}

export default MessageIcon