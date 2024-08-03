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
			},
			success: {
				base: 'bg-transparent',
				content: 'bg-success-1 text-success-text'
			},
			error: {
				base: 'bg-transparent',
				content: 'bg-error-1 text-error-text'
			},
			'gray-text': {
				base: 'bg-transparent',
				content: 'bg-[var(--color-decor-4)] text-[#BDBDBD]'
			}
		},
		size: {
			'1/2': {
				content:
					'w-[225px] min-h-[100px] h-auto flex p-3 items-start justify-start break-words'
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
