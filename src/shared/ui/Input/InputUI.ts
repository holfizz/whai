import { extendVariants, Input as InputUI } from '@nextui-org/react'

export const Input = extendVariants(InputUI, {
	variants: {
		color: {
			white: {
				input: `bg-[var(--color-white)] text-[var(--color-black)] border-[var(--color-white) data-[hover=true]:bg-[var(--color-white)] group-data-[focus=true]:bg-[var(--color-white)] hover:bg-[var(--color-white)] hover:border-[var(--color-white)]`,
				base: `bg-[var(--color-white)] data-[hover=true]:bg-[var(--color-white)] group-data-[focus=true]:bg-[var(--color-white)]`,
				hover:
					'data-[hover=true]:bg-white group-data-[focus=true]:bg-[var(--color-white)]',
				mainWrapper: `bg-[var(--color-white)] data-[hover=true]:bg-[var(--color-white)] group-data-[focus=true]:bg-[var(--color-white)]`,
				inputWrapper: `bg-[var(--color-white)] data-[hover=true]:bg-[var(--color-white)] group-data-[focus=true]:bg-[var(--color-white)]`,
				helperWrapper: `bg-[var(--color-white)] data-[hover=true]:bg-[var(--color-white)] group-data-[focus=true]:bg-[var(--color-white)]`,
				placeholder:
					'text-secondary group-data-[focus=true]:bg-[var(--color-white)]',
				innerWrapper:
					'bg-[var(--color-white)] data-[hover=true]:bg-[var(--color-white)] group-data-[focus=true]:bg-[var(--color-white)]'
			}
		},

		size: {
			full: {
				input: 'w-full',
				base: 'w-full'
			}
		},
		radius: {
			roundedFull: {
				input: 'rounded-[30px]',
				base: 'rounded-[30px]',
				inputWrapper: 'rounded-[30px] px-4 '
			}
		}
	}
})
