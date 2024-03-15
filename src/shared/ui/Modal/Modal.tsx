import dynamic from 'next/dynamic'
import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'

interface ModalProps {
	className?: string
	isOpen: boolean
	onClose: Dispatch<SetStateAction<boolean>>
}

const DynamicComponentWithNoSSR = dynamic(
	() => import('@/shared/ui/Portal/Portal'),
	{
		ssr: false,
	},
)

const Modal: FC<PropsWithChildren<ModalProps>> = props => {
	const { className, children, isOpen, onClose } = props

	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose(false)
		}
	}

	return (
		<DynamicComponentWithNoSSR>{isOpen && <></>}</DynamicComponentWithNoSSR>
	)
}

export default Modal
