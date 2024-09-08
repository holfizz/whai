import React from 'react'

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='12'
			height='12'
			viewBox='0 0 12 12'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M0.628753 0.633441C1.02073 0.243226 1.65618 0.243304 2.04806 0.633614L5.97425 4.54147L9.90541 0.626513C10.2972 0.236073 10.9326 0.235788 11.3247 0.625874C11.7168 1.01596 11.7171 1.6487 11.3254 2.03914L7.39339 5.95491L11.3742 9.96095C11.7661 10.3513 11.766 10.984 11.374 11.3742C10.982 11.7644 10.3466 11.7644 9.9547 11.374L5.97472 7.36881L2.08147 11.3437C1.68972 11.7341 1.05427 11.7344 0.662161 11.3443C0.270052 10.9542 0.269765 10.3215 0.66152 9.93103L4.55558 5.95537L0.628578 2.04671C0.236695 1.6564 0.236773 1.02366 0.628753 0.633441Z'
				fill='#C7C7CC'
			/>
		</svg>
	)
}

export default CloseIcon
