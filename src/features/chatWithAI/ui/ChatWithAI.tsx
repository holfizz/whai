import React, { useState } from 'react'
import cls from './ChatWithAI.module.scss'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { Modal, ModalContent } from '@/shared/Modal/Modal'
import {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalProps,
	useDisclosure
} from '@nextui-org/react'
import { IoClose } from 'react-icons/io5'
import ChatsMenuIcon from '@/shared/assets/icons/Lesson/Fill/ChatsMenuIcon'
import SendIcon from '@/shared/assets/icons/Lesson/Fill/SendIcon'
import { Input } from '@/shared/ui/Input/InputUI'
import ChatList from '@/features/chatWithAI/ui/ChatList/ChatList'
import ChatUI from '@/features/chatWithAI/ui/ChatUI/ChatUI'

const ChatWithAI = ({ lessonId }: { lessonId: string }) => {
	const t = useTranslations('Lesson')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [scrollBehavior, setScrollBehavior] =
		useState<ModalProps['scrollBehavior']>('inside')
	const [isAdditionalParam, setIsAdditionalParam] = useState<boolean>(false)

	const handleOpen = () => {
		onOpen()
	}

	return (
		<>
			<Modal
				size={'chat'}
				variant={'chat'}
				className={cls.modal}
				onOpenChange={handleOpen}
				isOpen={isOpen}
				onClose={onClose}
				scrollBehavior={scrollBehavior}
				hideCloseButton
			>
				<ModalContent>
					<>
						<ModalHeader
							className={
								'flex items-center justify-between mt-2 py-[5px] px-[12px]'
							}
						>
							{isAdditionalParam ? (
								<ChatList
									lessonId={lessonId}
									setIsAdditionalParam={setIsAdditionalParam}
								/>
							) : (
								<>
									<Button
										onClick={() => setIsAdditionalParam(true)}
										color={'white'}
										variant={'circle'}
										size={'sRound'}
										startContent={<ChatsMenuIcon />}
									/>
									<Button
										onPress={onClose}
										color={'accent'}
										variant={'circle'}
										size={'sRound'}
										startContent={
											<IoClose size={24} color={'var(--color-white)'} />
										}
									/>
								</>
							)}
						</ModalHeader>
						<ModalBody className={'h-auto'}>
							<ChatUI />
						</ModalBody>
						<ModalFooter>
							<Input
								classNames={{
									inputWrapper: [
										'w-full',
										'py-[10px]',
										'px-[20px]',
										'rounded-3xl',
										'h-auto'
									],
									innerWrapper: ['flex justify-between'],
									input: ['w-max']
								}}
								placeholder={t('Your question')}
								endContent={
									<Button
										isIconOnly
										size={'sRound'}
										variant={'circle'}
										color={'accent'}
										startContent={
											<SendIcon
												height={20}
												width={20}
												fill={'var(--color-white)'}
											/>
										}
									/>
								}
							/>
						</ModalFooter>
					</>
				</ModalContent>
			</Modal>
			<Button
				onPress={() => handleOpen()}
				className={cls.askAIBtn}
				color={'accent'}
			>
				{t('Ask AI')}
			</Button>
		</>
	)
}

export default ChatWithAI
