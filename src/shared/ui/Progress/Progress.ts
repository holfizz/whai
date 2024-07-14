import { extendVariants, Progress as ProgressUI } from '@nextui-org/react'

export const Progress = extendVariants(ProgressUI, {
	variants: {
		color: {
			peach: {
				base: `bg-[var(--color-decor-3)]`,
				selected: 'bg-[var(--color-decor-3)] ',
				hover: 'bg-red',
				track: 'bg-[var(--color-decor-3)]',
				indicator: 'bg-[var(--color-decor-2)]'
			}
		}
	}
})
