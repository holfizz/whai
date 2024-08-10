'use client'
import {
	useChatWithAIAnswerSubscription,
	useCreateMessageWithAI,
	useGetAllMessagesInChatWithAI
} from '@/entities/messageWithAI'
import ChatUi from '@/features/chatWithAI/ui/ChatUI/ChatUI'
import Button from '@/shared/ui/Button/Button'
import { Modal, ModalContent } from '@/shared/ui/Modal/Modal'
import {
	ModalBody,
	ModalFooter,
	ModalProps,
	useDisclosure
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { useChatStore } from '../model/chat-with-ai.store'
import cls from './ChatWithAI.module.scss'
import MessageInput from './MessageInput'
import ModalHeader from './ModalHeader'

const ChatWithAI = ({ lessonId }: { lessonId: string }) => {
	const t = useTranslations('Lesson')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [scrollBehavior, setScrollBehavior] =
		useState<ModalProps['scrollBehavior']>('inside')
	const [isAdditionalParam, setIsAdditionalParam] = useState<boolean>(false)
	const [messageContent, setMessageContent] = useState('')
	const [loading, setLoading] = useState<boolean>(false)
	const [messages, setMessages] = useState([])
	const [partialMessage, setPartialMessage] = useState<any>(null)
	const initialTake = 10
	const [skip, setSkip] = useState(0)
	const [take] = useState(initialTake)
	const [isLoadingMore, setIsLoadingMore] = useState(false)

	const { createMessageWithAI } = useCreateMessageWithAI()
	const { selectedChatId, setSelectedChatId } = useChatStore()
	const {
		messagesAllMessagesInChatWithAI,
		loadMore,
		loadingAllMessagesInChatWithAI
	} = useGetAllMessagesInChatWithAI({
		chatId: selectedChatId,
		initialTake: take,
		initialSkip: skip
	})

	// Subscription to listen for new messages
	const { subscriptionChatWithAIData } =
		useChatWithAIAnswerSubscription(selectedChatId)

	useEffect(() => {
		if (messagesAllMessagesInChatWithAI.length > 0) {
			setMessages(
				messagesAllMessagesInChatWithAI.map(msg => ({
					...msg,
					content: msg.content
				}))
			)
		}
	}, [messagesAllMessagesInChatWithAI])

	useEffect(() => {
		if (subscriptionChatWithAIData && !subscriptionChatWithAIData.is_finish) {
			const { message, is_finish, conversation_id } = subscriptionChatWithAIData

			setPartialMessage(prev => {
				if (prev && prev.id === conversation_id) {
					const newContent = prev.content + message.content
					return { ...prev, content: newContent }
				}
				const updatedMessage = {
					...message,
					content: message.content,
					id: conversation_id
				}

				if (is_finish) {
					setMessages(prevMessages => [
						{ ...updatedMessage, type: 'answer' },
						...prevMessages.filter(msg => msg.id !== updatedMessage.id)
					])
					return null
				}
				return updatedMessage
			})
		}
	}, [subscriptionChatWithAIData])

	useEffect(() => {
		// Reset messages and partial messages when selectedChatId changes
		if (selectedChatId) {
			setMessages([])
			setPartialMessage(null)
			setSkip(0)
		}
	}, [selectedChatId])

	const handleLoadMore = useCallback(() => {
		if (!isLoadingMore) {
			setIsLoadingMore(true)
			const newSkip = skip + take
			loadMore({ currentSkip: newSkip, currentTake: take })
				.then(() => {
					setSkip(newSkip)
					setIsLoadingMore(false)
				})
				.catch(() => {
					setIsLoadingMore(false)
				})
		}
	}, [loadMore, skip, take, isLoadingMore])

	const handleStartReached = useCallback(() => {
		if (!isLoadingMore && !loadingAllMessagesInChatWithAI) {
			handleLoadMore()
		}
	}, [handleLoadMore, isLoadingMore, loadingAllMessagesInChatWithAI])

	const handleOpen = () => {
		onOpen()
	}

	const handleSendMessage = async () => {
		if (messageContent.trim().length < 3) {
			alert('Message must be at least 3 characters long')
			return
		}

		const sentMessage = {
			content: messageContent,
			role: 'USER',
			id: crypto.randomUUID()
		}
		setMessages(prevMessages => [sentMessage, ...prevMessages])
		setMessageContent('')

		setLoading(true)

		try {
			const response = await createMessageWithAI({
				variables: {
					chatWithAIRequestDto: {
						chatWithAIId: selectedChatId,
						message: messageContent,
						lessonId: lessonId
					}
				}
			})

			const finalMessage = response.data.createMessageWithAI
			setMessages(prevMessages => {
				const updatedMessages = prevMessages.filter(
					msg => msg.role !== 'assistant' || msg.type !== 'partial'
				)
				return [finalMessage, ...updatedMessages]
			})
			setPartialMessage(null)
		} catch (error) {
			console.error('Error sending message:', error)
		} finally {
			setLoading(false)
		}
	}

	const isSendButtonDisabled = messageContent.trim().length < 3 || loading

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
							isAdditionalParam={isAdditionalParam}
							setIsAdditionalParam={setIsAdditionalParam}
							lessonId={lessonId}
							onClose={onClose}
						/>
						<ModalBody className={'h-auto'}>
							<ChatUi
								messages={
									partialMessage ? [partialMessage, ...messages] : messages
								} // Use partialMessage if present
								loading={loadingAllMessagesInChatWithAI}
								isLoadingMore={isLoadingMore}
								handleStartReached={handleStartReached}
								skip={skip}
							/>
						</ModalBody>
						<ModalFooter>
							<MessageInput
								messageContent={messageContent}
								setMessageContent={setMessageContent}
								handleSendMessage={handleSendMessage}
								isSendButtonDisabled={isSendButtonDisabled}
								loading={loading}
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
