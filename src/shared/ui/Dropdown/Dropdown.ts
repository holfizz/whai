import {
	Dropdown as DropdownUI,
	DropdownItem as DropdownItemUI,
	DropdownMenu as DropdownMenuUI,
	extendVariants,
} from '@nextui-org/react'

export const DropdownItem = extendVariants(DropdownItemUI, {
	variants: {
		color: {
			peach: {
				base: `bg-[var(--color-decor-8)] text-[var(--color-accent)]`,
				selected: 'bg-[var(--color-decor-8)] text-[var(--color-accent)]',
				hover: 'bg-red',
			},
			white: {
				base: `bg-[var(--color-white)] text-[var(--color-accent)] `,
				selected: 'bg-[var(--color-decor-8)] text-[var(--color-accent)]',
				hover: 'bg-[var(--color-decor-4)]'
			},
		},
	},
})

export const Dropdown = extendVariants(DropdownUI, {
	variants: {
		color: {
			white: {
				base: 'bg-[var(--color-white)] text-[var(--color-accent)]',
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
			white: {
				base: 'bg-[var(--color-white)] text-[var(--color-accent)]',
			},
			peach: {
				base: 'bg-[var(--color-decor-1)]',
			},
		},
	},
})
