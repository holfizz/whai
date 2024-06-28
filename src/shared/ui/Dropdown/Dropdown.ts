import {
	DropdownItem as DropdownItemUI,
	DropdownMenu as DropdownMenuUI,
	Dropdown as DropdownUI,
	extendVariants,
} from '@nextui-org/react'

export const DropdownItem = extendVariants(DropdownItemUI, {
	variants: {
		color: {
			peach: {
				base: `bg-[var(--color-decor-8)] text-[var(--color-success)] `,
				selected: 'bg-[var(--color-decor-8)] text-[var(--color-accent)]',
				hover: 'bg-red',
			},
		},
	},
})

export const Dropdown = extendVariants(DropdownUI, {
	variants: {
		color: {
			default: {
				base: 'bg-[var(--color-background-1)]',
			},
			peach: {
				base: 'bg-[var(--color-decor-1)]',
			},
		},
	},
})

export const DropdownMenu = extendVariants(DropdownMenuUI, {
	variants: {
		color: {
			default: {
				base: 'bg-[var(--color-background-1)] ',
			},
			peach: {
				base: 'bg-[var(--color-decor-1)]',
			},
		},
	},
})
