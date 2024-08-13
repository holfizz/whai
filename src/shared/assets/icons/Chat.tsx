import React from 'react'

const ChatIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M3 0C1.34315 0 0 1.34315 0 3V13C0 14.6569 1.34315 16 3 16H10.75L15.3753 19.7002C16.0301 20.2241 17 19.7579 17 18.9194V16H17.5151C18.8874 16 20 14.8875 20 13.5151V3C20 1.34315 18.6569 0 17 0H3Z' />
		</svg>
	)
}

export default ChatIcon
