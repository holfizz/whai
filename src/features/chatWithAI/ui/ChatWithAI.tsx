import React from 'react'
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
import Message, { MessageFrom } from '@/shared/ui/Message/Message'
import SendIcon from '@/shared/assets/icons/Lesson/Fill/SendIcon'
import { Input } from '@/shared/ui/Input/InputUI'

const ChatWithAI = () => {
	const t = useTranslations('Lesson')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [scrollBehavior, setScrollBehavior] =
		React.useState<ModalProps['scrollBehavior']>('inside')

	const handleOpen = () => {
		onOpen()
	}
	// @ts-ignore
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
					{onClose => (
						<>
							<ModalHeader className={'fle items-center justify-between'}>
								<Button
									color={'white'}
									variant={'round'}
									size={'sRound'}
									startContent={<ChatsMenuIcon />}
								/>
								<Button
									onPress={onClose}
									color={'accent'}
									variant={'round'}
									size={'sRound'}
									startContent={
										<IoClose size={24} color={'var(--color-white)'} />
									}
								/>
							</ModalHeader>
							<ModalBody className={'h-auto'}>
								<Message messageFrom={MessageFrom.USER}>
									Что такое волновой дуалеизм?
								</Message>
								<Message messageFrom={MessageFrom.AI}>
									Квантовый дуализм — это фундаментальное свойство природы,
									заключающееся в том, что всем микрообъектам присущи
									одновременно и корпускулярные, и волновые свойства. Это основа
									квантовой механики, которая объясняет поведение элементарных
									частиц и их взаимодействие с окружающим миром.
								</Message>
								<Message messageFrom={MessageFrom.USER}>
									Что такое волновой дуалеизм?
								</Message>{' '}
								<Message messageFrom={MessageFrom.USER}>?</Message>
								<Message messageFrom={MessageFrom.AI}>?</Message>
							</ModalBody>
							<ModalFooter>
								{/*<Input*/}
								{/*	className={cls.askAIInput}*/}
								{/*	placeholder={t('Your question')}*/}
								{/*	theme={InputTheme.WHITE}*/}
								{/*	rounded={InputRounded.LG}*/}
								{/*/>*/}
								<Input
									classNames={{
										input: ['bg-color-white data-[hover=true]:bg-color-white'],
										innerWrapper: 'bg-color-white',
										inputWrapper: ['shadow-xl', '!cursor-text']
									}}
									placeholder={t('Your question')}
									endContent={
										<SendIcon
											className={'cursor-pointer'}
											fill={'var(--color-accent)'}
										/>
									}
								/>
							</ModalFooter>
						</>
					)}
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
