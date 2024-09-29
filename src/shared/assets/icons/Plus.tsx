import React from 'react'

const PlusIcon = ({
	fontSize = 14,
	...props
}: React.SVGProps<SVGSVGElement> & { fontSize?: number }) => {
	return (
		<svg
			width={fontSize}
			height={fontSize}
			viewBox='0 0 14 14'
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M7.00845 0.333359C7.55934 0.333359 8.01338 0.782794 8.01338 1.33508L8.01363 6.00584H12.6698C13.2207 6.00584 13.6673 6.45355 13.6673 7.00584C13.6673 7.55812 13.2207 8.00584 12.6698 8.00584H8.01363L8.01353 12.6638C8.01353 13.2161 7.56695 13.6638 7.01605 13.6638C6.46516 13.6638 6.01857 13.2161 6.01857 12.6638L6.01867 8.00584H1.34477C0.793879 8.00584 0.333984 7.54433 0.333984 6.99205C0.333984 6.43976 0.793879 6.00584 1.34477 6.00584H6.01867L6.01841 1.33508C6.01841 0.782794 6.45755 0.333359 7.00845 0.333359Z'
				fill='#0F0F0F'
			/>
		</svg>
	)
}

export default PlusIcon
