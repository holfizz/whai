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
		},
		variant: {
			chat: {
				base: 'bg-decor-4 ',
				backdrop: 'bg-transparent ',
				closeButton: 'w-[42px] h-[42px] bg-accent hover:bg-accent'
			}
		},
		size: {
			chat: {
				base: 'h-[70vh] w-[335px] max-sm:w-full max-sm:h-[100vh]'
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
