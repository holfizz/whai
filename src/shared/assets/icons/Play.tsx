import React from 'react'

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='35'
			height='47'
			viewBox='0 0 35 47'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M4.45467 46.511L33.7241 25.8985C35.4253 24.7575 35.4253 22.2425 33.7241 21.1015L4.45467 0.488986C2.55053 -0.788134 0 0.585146 0 2.88751V44.1125C0 46.4149 2.55053 47.7881 4.45467 46.511Z'
				fill='white'
			/>
		</svg>
	)
}

export default PlayIcon
