import React from 'react'

const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM11 6C11 6.55228 10.5523 7 10 7C9.44772 7 9 6.55228 9 6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6ZM9 10C9 9.44772 9.44772 9 10 9C10.5523 9 11 9.44772 11 10V15C11 15.5523 10.5523 16 10 16C9.44771 16 9 15.5523 9 15V10Z'
			/>
		</svg>
	)
}

export default InfoIcon
