import React from 'react'

const TickIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='16'
			height='12'
			viewBox='0 0 16 12'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M15.3748 1.10666C15.807 1.55942 15.7903 2.27681 15.3375 2.709L6.78226 10.9309C6.56137 11.1417 6.26475 11.2545 5.95958 11.2437C5.65442 11.2329 5.36652 11.0994 5.16112 10.8734L0.981266 6.36059C0.560225 5.89744 0.594357 5.18066 1.0575 4.75962C1.52065 4.33858 2.23742 4.37271 2.65846 4.83586L6.05717 8.48946L13.7725 1.06939C14.2252 0.637207 14.9426 0.653891 15.3748 1.10666Z'
				fill='black'
			/>
		</svg>
	)
}

export default TickIcon
