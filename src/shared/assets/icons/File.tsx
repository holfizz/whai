import React from 'react'

const FileIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='24'
			height='30'
			viewBox='0 0 24 30'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M0 4.2C0 1.92052 1.80727 0 4.125 0H14.8502C15.9581 0 17.0117 0.453069 17.7818 1.24519L22.8067 6.41357C23.5754 7.20426 24 8.26789 24 9.36838V25.8C24 28.0795 22.1927 30 19.875 30H4.125C1.80727 30 0 28.0795 0 25.8V4.2ZM13.5 10.5H21V9.36838C21 9.0367 20.8715 8.72681 20.6557 8.50481L15.6309 3.33643C15.4164 3.11586 15.1347 3 14.8502 3H13.5V10.5Z'
				fill='#FFB57F'
			/>
		</svg>
	)
}

export default FileIcon
