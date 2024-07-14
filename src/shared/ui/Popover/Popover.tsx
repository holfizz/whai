'use client'
import {
	extendVariants,
	Popover as UiPopover,
	PopoverContent as UiPopoverContent
} from '@nextui-org/react'

export const Popover = extendVariants(UiPopover, {
	variants: {
		color: {
			peach: {
				base: `bg-[var(--color-white)] text-[var(--color-accent)] rounded-xl border-none`,
				selected: 'bg-[var(--color-white)] text-[var(--color-accent)]',
				arrow: 'bg-[var(--color-white)] text-red'
			}
		}
	}
})

export const PopoverContent = extendVariants(UiPopoverContent, {
	variants: {
		color: {
			peach: 'text-[var(--color-accent)]'
		}
	}
})
