'use client'
import { Button as UiButton, extendVariants } from '@nextui-org/react'

const Button = extendVariants(UiButton, {
	variants: {
		color: {
			accent: 'text-[var(--color-white)] bg-[var(--color-accent)]',
			white: 'bg-[var(--color-white)] text-[var(--color-accent)]',
			gray: 'bg-[var(--color-decor-4)] text-[var(--color-accent)]',
			primary: 'text-[var(--color-accent)] bg-[var(--color-decor-1)]',
			secondary: 'text-[var(--color-accent)] bg-[var(--color-decor-3)]',
			main: 'text-[var(--color-accent)] bg-[var(--color-decor-2)]',
			clear: 'bg-transparent text-[var(--primary-color)]'
		},
		variant: {
			sidebar:
				'bg-transparent text-[var(--color-accent)] flex justify-center items-center',
			circle:
				'rounded-full flex align-center justify-center stroke-white min-w-fit ',
			sRound:
				'rounded-2xl flex align-center justify-center stroke-white min-w-fit '
		},
		isDisabled: {
			true: 'opacity-30  cursor-not-allowed'
		},
		size: {
			xs: 'px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small',
			md: 'px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small',
			xl: 'px-5 py-3 w-[150px] h-[50px] gap-4 rounded-2xl',
			'3xl': 'px-5 py-3 w-[215px] h-[85px] gap-4 rounded-3xl ',
			sRound: 'w-[42px] h-[42px] px-0',
			mRound: 'w-[78px] h-[78px] px-0'
		}
	},
	defaultVariants: {
		color: 'clear',
		size: 'md'
	}
})
export default Button
