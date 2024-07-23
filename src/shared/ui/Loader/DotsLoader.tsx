import React from 'react'

const DotsLoader = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={50}
			height={30}
			className={className}
			viewBox='0 0 200 200'
		>
			<circle
				fill='%230F0F0F'
				stroke='%230F0F0F'
				stroke-width='5'
				r='25'
				cx='20'
				cy='65'
			>
				<animate
					attributeName='cy'
					calcMode='spline'
					dur='1'
					values='40;80;40;'
					keySplines='.5 0 .5 1;.5 0 .5 1'
					repeatCount='indefinite'
					begin='-.4'
				></animate>
			</circle>
			<circle
				fill='%230F0F0F'
				stroke='%230F0F0F'
				stroke-width='5'
				r='25'
				cx='80'
				cy='65'
			>
				<animate
					attributeName='cy'
					calcMode='spline'
					dur='1'
					values='40;80;40;'
					keySplines='.5 0 .5 1;.5 0 .5 1'
					repeatCount='indefinite'
					begin='-.2'
				></animate>
			</circle>
			<circle
				fill='%230F0F0F'
				stroke='%230F0F0F'
				stroke-width='5'
				r='25'
				cx='140'
				cy='65'
			>
				<animate
					attributeName='cy'
					calcMode='spline'
					dur='1'
					values='40;80;40;'
					keySplines='.5 0 .5 1;.5 0 .5 1'
					repeatCount='indefinite'
					begin='0'
				></animate>
			</circle>
		</svg>
	)
}

export default DotsLoader
