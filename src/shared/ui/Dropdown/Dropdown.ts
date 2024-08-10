import {
	DropdownItem as DropdownItemUI,
	DropdownMenu as DropdownMenuUI,
	Dropdown as DropdownUI,
	extendVariants
} from '@nextui-org/react'

export const DropdownItem = extendVariants(DropdownItemUI, {
	variants: {
		color: {
			white: {
				base: `bg-[var(--color-white)] text-[var(--color-accent)] `,
				selected: 'bg-[var(--color-decor-1)] text-[var(--color-accent)]',
				hover: 'bg-[var(--color-decor-4)]'
			},
			danger: {
				base: `bg-[var(--color-error-1)] text-[var(--color-accent)] `,
				selected: 'bg-[var(--color-decor-1)] text-[var(--color-accent)]',
				hover: 'bg-[var(--color-decor-4)]'
			}
		}
	}
})

export const Dropdown = extendVariants(DropdownUI, {
	variants: {
		color: {
			white: {
				base: 'bg-[var(--color-white)] text-[var(--color-accent)]'
			},
			main: {
				base: 'bg-[var(--color-decor-1)]'
			}
		}
	}
})

export const DropdownMenu = extendVariants(DropdownMenuUI, {
	variants: {
		color: {
			white: {
				base: 'bg-[var(--color-white)] text-[var(--color-accent)]'
			}
		}
	}
})
