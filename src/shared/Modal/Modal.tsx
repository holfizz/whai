import {
	extendVariants,
	Modal as ModalUI,
	ModalContent as ModalContentUI
} from '@nextui-org/react'

export const Modal = extendVariants(ModalUI, {
	variants: {
		color: {
			white: {
				base: 'bg-white rounded-xl',
				backdrop: 'ba-[rgba(65, 54, 46, 0.8)]'
			}
		}
	}
})

export const ModalContent = extendVariants(ModalContentUI, {
	variants: {
		color: {
			white: 'bg-white'
		}
	}
})
