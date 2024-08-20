'use client'
import { Button as UiButton, extendVariants } from '@nextui-org/react'

const Button = extendVariants(UiButton, {
	variants: {
		color: {
			accent: 'text-white bg-accent',
			white: 'bg-white text-accent',
			gray: 'bg-decor-4 text-accent',
			'gray-text': 'bg-decor-4 text-[#BDBDBD]',
			error: 'bg-error-1 text-error-text',
			success: 'bg-success-1 text-success-text',
			'success-4': 'bg-success-4 text-success-text',
			primary: 'text-accent bg-decor-1 data-[hover=true]:bg-[#FFEDB6CD]',
			secondary: 'text-accent bg-decor-3',
			main: 'text-accent bg-decor-2',
			clear: 'bg-transparent text-[var(--primary-color)]'
		},
		variant: {
			sidebar: 'bg-transparent text-accent flex justify-center items-center',
			circle: 'rounded-full flex align-center justify-center min-w-fit ',
			square:
				'rounded-full flex align-center justify-center min-w-fit rounded-lg ',
			sRound:
				'rounded-2xl flex align-center justify-center stroke-white min-w-fit ',
			noneRound: 'rounded-none',
			lightMain: 'data-[hover=true]:bg-[#FD9F9F84] bg-transparent'
		},
		isDisabled: {
			true: 'opacity-30  cursor-not-allowed'
		},
		size: {
			xs: 'px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small',
			md: 'px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small',
			xl: 'px-5 py-3 w-[150px] h-[50px] gap-4 rounded-2xl',
			'3xl':
				'px-5 py-3 w-[215px] h-[85px] gap-4 rounded-3xl max-sm:px-2 max-sm:py-1 max-sm:w-[120px] max-sm:h-[50px]',
			auto: 'px-5 py-3 min-w-[215px] min-h-[60px] gap-4 rounded-xl w-full h-auto max-sm:w-[40vw] max-sm:h-[50px]',
			sRound: 'w-[42px] h-[42px] px-0',
			mRound: 'w-[78px] h-[78px] px-0',
			mdIcon: 'w-[70px] h-[70px] px-0',
			full: 'w-full h-auto min-h-[60px] px-0'
		}
	},
	defaultVariants: {
		color: 'clear',
		size: 'md'
	}
})
export default Button
