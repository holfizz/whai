import React from 'react'

const StatisticsIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M7.2998 1C7.2998 0.447716 7.74752 0 8.2998 0H11.5998C12.1521 0 12.5998 0.447715 12.5998 1V20H7.2998V1Z' />
			<path d='M0 11C0 10.4477 0.447715 10 1 10H4.3C4.85228 10 5.3 10.4477 5.3 11V20H0.999999C0.447715 20 0 19.5523 0 19V11Z' />
			<path d='M15.5996 6C15.0473 6 14.5996 6.44772 14.5996 7V20H18.8996C19.4519 20 19.8996 19.5523 19.8996 19V7C19.8996 6.44772 19.4519 6 18.8996 6H15.5996Z' />
		</svg>
	)
}

export default StatisticsIcon
