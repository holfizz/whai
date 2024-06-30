'use client'
import {extendVariants, Popover as UiPopover, PopoverContent as UiPopoverContent} from '@nextui-org/react'

export const Popover = extendVariants(UiPopover, {
  variants: {
    color: {
      peach: {
        base: `bg-[var(--color-decor-8)] text-[var(--color-accent)] rounded-xl`,
        selected: 'bg-[var(--color-decor-8)] text-[var(--color-accent)]',
        arrow: "bg-[var(--color-decor-8)] text-red"
      },
    },
  },

})

export const PopoverContent = extendVariants(UiPopoverContent, {
  variants: {
    color: {
      peach: "text-[var(--color-accent)]"
    }
  },

})

