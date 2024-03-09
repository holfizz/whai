'use client'
import { Button as UiButton, extendVariants } from '@nextui-org/react'

const Button = extendVariants(UiButton, {
	variants: {
		color: {
			main: 'text-[#000] bg-[#e8f99b]',
			secondary: 'bg-[#2f311d] text-[#fff]',
			clear: 'bg-transparent text-[var(--primary-color)]',
		},
		isDisabled: {
			true: 'bg-[#89925F] text-[#000] opacity-10 cursor-not-allowed',
		},
		size: {
			xs: 'px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small',
			md: 'px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small',
			xl: 'px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium',
		},
	},
	defaultVariants: {
		color: 'clear',
		size: 'md',
	},
})
export default Button
