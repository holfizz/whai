import {
	CircularProgress as CircularProgressUI,
	extendVariants
} from '@nextui-org/react'

export const CircularProgress = extendVariants(CircularProgressUI, {
	variants: {
		variant: {
			big: {
				svg: 'w-[64px] h-[64px]',
				value: 'hidden'
			}
		},
		color: {
			main: {
				indicator: 'bg-decor-2',
				svg: 'text-decor-2'
			}
		}
	}
})
