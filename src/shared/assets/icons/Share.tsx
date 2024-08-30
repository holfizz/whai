import React from 'react'

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M22.3293 12.3763C22.4333 12.2853 22.495 12.1553 22.4997 12.0172C22.5044 11.879 22.4518 11.7451 22.3543 11.6472L14.3865 3.64718C14.2437 3.50376 14.0285 3.46061 13.8414 3.53788C13.6543 3.61515 13.5323 3.7976 13.5323 4.00001L13.5323 8.00745C10.1209 8.10947 7.16885 9.25765 5.03669 11.2606C2.79775 13.3638 1.5 16.3753 1.5 20C1.5 20.2124 1.63412 20.4015 1.8345 20.4718C2.03487 20.5421 2.25778 20.4782 2.39043 20.3124C3.37272 19.0845 4.59167 17.7655 6.39853 16.7482C8.11212 15.7834 10.3835 15.0739 13.5286 15.0054L13.5 18.9964C13.4986 19.1933 13.6128 19.3726 13.7918 19.4546C13.9707 19.5366 14.1811 19.5059 14.3292 19.3763L22.3293 12.3763Z'
				fill='#FFB57F'
			/>
		</svg>
	)
}

export default ShareIcon
