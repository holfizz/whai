import React from 'react'

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M12.762 2.35235C12.5752 2.13259 12.3026 2.00418 12.0142 2.0001C11.7258 1.99602 11.4497 2.11665 11.2567 2.33104L2.25672 12.331C1.99254 12.6246 1.92585 13.0461 2.08652 13.4068C2.24718 13.7676 2.60511 14 3.00002 14H5.00002V20C5.00002 20.5523 5.44773 21 6.00002 21H10V16H14V21H18C18.5523 21 19 20.5523 19 20V14H20.5C20.8898 14 21.2441 13.7735 21.4077 13.4197C21.5713 13.0659 21.5144 12.6493 21.262 12.3524L12.762 2.35235Z' />
		</svg>
	)
}

export default HomeIcon
