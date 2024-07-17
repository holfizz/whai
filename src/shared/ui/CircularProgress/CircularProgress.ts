import {
	CircularProgress as CircularProgressUI,
	extendVariants
} from '@nextui-org/react'

export const CircularProgress = extendVariants(CircularProgressUI, {
	variants: {
		color: {
			main: {
				indicator: 'bg-black',
				svg: '#000000'
			}
		}
	}
})
