'use client'
import { Button as UiButton, extendVariants } from '@nextui-org/react'

const Button = extendVariants(UiButton, {
	variants: {
		color: {
			accent: 'text-[var(--color-secondary)] bg-[var(--color-accent)]',
			primary: 'text-[var(--color-accent)] bg-[var(--color-decor-1)]',
			secondary: 'text-[var(--color-accent)] bg-[var(--color-decor-3)]',
			softPeach: 'text-[var(--color-accent)] bg-[var(--color-decor-4)]',
			clear: 'bg-transparent text-[var(--primary-color)]'
		},
		variant: {
			sidebar:
				'bg-transparent text-[var(--color-accent)] flex justify-center items-center',
			round:
				'bg-accent rounded-full flex align-center justify-center stroke-white min-w-fit '
		},
		isDisabled: {
			true: 'opacity-30  cursor-not-allowed'
		},
		size: {
			xs: 'px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small',
			md: 'px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small',
			xl: 'px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium',
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
