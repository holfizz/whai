import React from 'react'

const BigDotsLoader = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={120}
			height={40}
			className={className}
			viewBox='0 0 200 100'
		>
			<circle
				fill='#FFB57F'
				stroke='#FFB57F'
				strokeWidth='5'
				r='20'
				cx='20'
				cy='50'
			>
				<animate
					attributeName='cy'
					calcMode='spline'
					dur='1s'
					values='30;70;30;'
					keySplines='.5 0 .5 1;.5 0 .5 1'
					repeatCount='indefinite'
					begin='-.4s'
				/>
			</circle>
			<circle
				fill='#FFB57F'
				stroke='#FFB57F'
				strokeWidth='5'
				r='20'
				cx='70'
				cy='50'
			>
				<animate
					attributeName='cy'
					calcMode='spline'
					dur='1s'
					values='30;70;30;'
					keySplines='.5 0 .5 1;.5 0 .5 1'
					repeatCount='indefinite'
					begin='-.2s'
				/>
			</circle>
			<circle
				fill='#FFB57F'
				stroke='#FFB57F'
				strokeWidth='5'
				r='20'
				cx='120'
				cy='50'
			>
				<animate
					attributeName='cy'
					calcMode='spline'
					dur='1s'
					values='30;70;30;'
					keySplines='.5 0 .5 1;.5 0 .5 1'
					repeatCount='indefinite'
					begin='0s'
				/>
			</circle>
		</svg>
	)
}

export default BigDotsLoader
