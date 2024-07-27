'use client'
import { Chip as UIChip, extendVariants } from '@nextui-org/react'
const Chip = extendVariants(UIChip, {
	variants: {
		color: {
			success: {
				base: 'bg-success-10 text-accent '
			},
			error: {
				base: 'bg-error-10 text-accent '
			},
			warning: {
				base: 'bg-[#ffc19eba] text-accent'
			}
		},
		variant: {},
		isDisabled: {},
		size: {}
	},
	defaultVariants: { size: 'sm' }
})
export default Chip
